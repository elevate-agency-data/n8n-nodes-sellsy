import type { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

// Acces "Personnel" Sellsy : seul type qui accepte client credentials (Reglages > Portail Developpeur > API V2 > Creer un acces API).
// Le type "Prive" impose authorization code + PKCE, le type "Public" est reserve aux partenaires.
// Le flux authorization code (acces "public", valide par Sellsy) viendra plus tard.
export class SellsyOAuth2Api implements ICredentialType {
	name = 'sellsyOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Sellsy OAuth2 API';

	documentationUrl =
		'https://github.com/agaudin-alt/n8n-nodes-sellsy?tab=readme-ov-file#credentials';

	icon: ICredentialType['icon'] = {
		light: 'file:icons/sellsy.svg',
		dark: 'file:icons/sellsy.dark.svg',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://login.sellsy.com/oauth2/access-tokens',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			// Avec un acces personnel, les droits sont fixes dans Sellsy au moment de creer l'acces API.
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.sellsy.com/v2',
			url: '/scopes',
			method: 'GET',
		},
	};
}
