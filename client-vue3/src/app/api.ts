import { Api, KClient } from 'k-models';
import { options } from '../shared/options';

export const api: Api = new Api(`${options.apiServerHost}:${options.apiServerPort}`);

export const client: KClient = new KClient(api);
