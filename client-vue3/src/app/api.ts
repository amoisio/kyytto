import { KClient } from 'k-models';
import { options } from '../shared/options';

export const client: KClient = new KClient(options.apiServerBaseUrl);
