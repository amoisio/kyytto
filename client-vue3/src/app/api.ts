import { apiBuilder, Api, clientBuilder, ApiClient } from 'kyytto-models';
import { options } from '../shared/options';

export const api: Api = apiBuilder(`${options.apiServerHost}:${options.apiServerPort}`);

export const client: ApiClient = clientBuilder(api);
