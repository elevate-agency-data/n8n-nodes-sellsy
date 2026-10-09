import type {
	DeclarativeRestApiSettings,
	IDataObject,
	IExecutePaginationFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IWebhookFunctions,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

// Code commun ecrit a la main. Les operations, elles, sont generees par scripts/generate.mjs.

export const SELLSY_BASE_URL = 'https://api.sellsy.com/v2';

export const SELLSY_CREDENTIAL = 'sellsyOAuth2Api';

function parseJsonParameter(
	ctx: IExecuteSingleFunctions,
	value: unknown,
	parameterName: string,
): unknown {
	if (typeof value !== 'string') return value;
	if (value.trim() === '') return undefined;
	try {
		return JSON.parse(value);
	} catch {
		throw new NodeOperationError(
			ctx.getNode(),
			`The parameter "${parameterName}" is not valid JSON`,
		);
	}
}

/**
 * n8n abandonne un corps JSON vide ({}) avant l'envoi, et Sellsy refuse un POST/PUT sans corps
 * ("contenu invalide") : on envoie alors explicitement le texte "{}".
 */
export async function ensureJsonBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body;
	const isEmptyObject =
		body !== null &&
		typeof body === 'object' &&
		!Buffer.isBuffer(body) &&
		Object.keys(body as IDataObject).length === 0;
	if (body === undefined || body === null || body === '' || isEmptyObject) {
		requestOptions.body = '{}';
		requestOptions.headers = { ...requestOptions.headers, 'Content-Type': 'application/json' };
	}
	return requestOptions;
}

/** Corps JSON complet saisi par l'utilisateur (corps en tableau, ou schema non decrit par la spec). */
export async function sendRawJsonBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const value = this.getNodeParameter('rawBody', undefined) as unknown;
	requestOptions.body = parseJsonParameter(this, value, 'Body') as IDataObject;
	return requestOptions;
}

/** Corps texte brut (endpoint POST /batch : une requete JSON par ligne). */
export async function sendRawTextBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	requestOptions.body = this.getNodeParameter('rawText', '') as string;
	requestOptions.json = false;
	requestOptions.headers = { ...requestOptions.headers, 'Content-Type': 'text/plain' };
	return requestOptions;
}

/** Envoi d'un fichier binaire n8n en multipart/form-data, dans le champ "file". */
export async function sendMultipartFile(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const binaryPropertyName = this.getNodeParameter('binaryPropertyName', 'data') as string;
	const binaryData = this.helpers.assertBinaryData(binaryPropertyName);
	const buffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName);

	const form = new FormData();
	form.append(
		'file',
		new Blob([new Uint8Array(buffer)], { type: binaryData.mimeType }),
		binaryData.fileName ?? 'file',
	);

	requestOptions.body = form;
	const headers = { ...(requestOptions.headers ?? {}) } as IDataObject;
	delete headers['Content-Type'];
	requestOptions.headers = headers;
	return requestOptions;
}

const PAGE_SIZE = 100;

/**
 * Pagination "seek" de Sellsy : chaque reponse renvoie dans pagination.offset le curseur de la page
 * suivante. On garde tous les autres parametres de la requete (embed, field, order, filtres...).
 */
export async function sellsyPaginate(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const results: INodeExecutionData[] = [];
	const baseQs: IDataObject = {
		...((requestData.options.qs as IDataObject) ?? {}),
		limit: PAGE_SIZE,
	};
	delete baseQs.offset;
	let offset: string | number | undefined;

	for (;;) {
		const qs: IDataObject = { ...baseQs };
		if (offset !== undefined) qs.offset = offset;
		// Appel direct : makeRoutingRequest applique deja rootProperty "data" et perd la pagination.
		const body = ((await this.helpers.httpRequestWithAuthentication.call(this, SELLSY_CREDENTIAL, {
			method: requestData.options.method,
			baseURL: requestData.options.baseURL,
			url: requestData.options.url ?? '',
			headers: requestData.options.headers,
			body: requestData.options.body,
			arrayFormat: requestData.options.arrayFormat,
			qs,
			json: true,
		})) ?? {}) as IDataObject;
		const data = (body.data ?? []) as IDataObject[];
		const pagination = (body.pagination ?? {}) as IDataObject;
		results.push(...data.map((json) => ({ json })));

		const count = Number(pagination.count ?? data.length);
		const limit = Number(pagination.limit ?? PAGE_SIZE);
		const total = Number(pagination.total);
		const done =
			data.length === 0 ||
			count < limit ||
			(Number.isFinite(total) && results.length >= total) ||
			pagination.offset === undefined ||
			pagination.offset === offset;
		if (done) break;
		offset = pagination.offset as string | number;
	}
	return results;
}

/** Appel direct a l'API, pour le noeud declencheur (webhooks) et les listes dynamiques. */
export async function sellsyApiRequest(
	this: IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	path: string,
	body?: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `${SELLSY_BASE_URL}${path}`,
		headers: { Accept: 'application/json' },
		json: true,
	};
	if (body !== undefined) options.body = body;
	return (await this.helpers.httpRequestWithAuthentication.call(
		this,
		SELLSY_CREDENTIAL,
		options,
	)) as IDataObject;
}
