import { ApiClient, buildApi, KyyttoClient } from 'kyytto-models';
import { options } from '../shared/options';

export const api = buildApi(`${options.apiServerHost}:${options.apiServerPort}`);

export const kyyttoClient: ApiClient = new KyyttoClient(api);