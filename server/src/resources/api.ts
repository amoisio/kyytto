import { Api } from 'kyytto-models';
import { options } from '../options.js';

/**
 * Global specification of the Kyyttö API.
 */
export const api = new Api(`${options.apiServerHost}:${options.apiServerPort}`);
