import { Api, KyyttoClient } from 'kyytto-models';
import { options } from '../shared/options';

export const api: Api = new Api(`${options.apiServerHost}:${options.apiServerPort}`);

export const client: KyyttoClient = new KyyttoClient(api);
