import {
	NodeConnectionTypes,
	NodeApiError,
	type IDataObject,
	type IHookFunctions,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
	type JsonObject,
} from 'n8n-workflow';

import { sellsyApiRequest } from './GenericFunctions';

type WebhookEventEntity = {
	id: string;
	description?: string;
	events?: Record<string, string>;
};

export class SellsyTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sellsy Trigger',
		name: 'sellsyTrigger',
		icon: { light: 'file:sellsy.svg', dark: 'file:sellsy.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when events happen in Sellsy',
		defaults: {
			name: 'Sellsy Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'sellsyOAuth2Api', required: true }],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event Names or IDs',
				name: 'events',
				type: 'multiOptions',
				typeOptions: { loadOptionsMethod: 'getEvents' },
				required: true,
				default: [],
				description:
					'Events to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Include Full Object',
						name: 'objectInPayload',
						type: 'boolean',
						default: false,
						description: 'Whether Sellsy sends the complete object in the payload, not only its ID',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = (await sellsyApiRequest.call(
					this,
					'GET',
					'/webhooks/events',
				)) as unknown as WebhookEventEntity[];
				const options: INodePropertyOptions[] = [];
				for (const entity of response ?? []) {
					for (const [event, label] of Object.entries(entity.events ?? {})) {
						options.push({
							name: `${entity.description ?? entity.id}: ${label}`,
							value: `${entity.id}.${event}`,
						});
					}
				}
				return options.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');
				if (staticData.webhookId === undefined) return false;
				try {
					await sellsyApiRequest.call(this, 'GET', `/webhooks/${staticData.webhookId as string}`);
					return true;
				} catch (error) {
					if ((error as JsonObject).httpCode === '404') {
						delete staticData.webhookId;
						return false;
					}
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const events = this.getNodeParameter('events', []) as string[];
				const options = this.getNodeParameter('options', {}) as IDataObject;
				const body: IDataObject = {
					type: 'http',
					name: `n8n - ${this.getWorkflow().name ?? this.getWorkflow().id}`,
					endpoint: webhookUrl,
					is_enabled: true,
					json_content_type: true,
					object_in_payload: options.objectInPayload === true,
					configuration: events.map((id) => ({ id, is_enabled: true })),
				};
				const response = await sellsyApiRequest.call(this, 'POST', '/webhooks', body);
				if (response.id === undefined) return false;
				this.getWorkflowStaticData('node').webhookId = response.id as number;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');
				if (staticData.webhookId === undefined) return true;
				try {
					await sellsyApiRequest.call(
						this,
						'DELETE',
						`/webhooks/${staticData.webhookId as string}`,
					);
				} catch (error) {
					this.logger.warn(
						`Sellsy Trigger: could not delete webhook ${staticData.webhookId as string}: ${(error as Error).message}`,
					);
					return false;
				}
				delete staticData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		// Ancien format Sellsy : un champ "notif" contenant du JSON.
		const payload =
			typeof body.notif === 'string'
				? (JSON.parse(body.notif) as IDataObject)
				: (body as IDataObject);
		return {
			workflowData: [this.helpers.returnJsonArray(payload)],
		};
	}
}
