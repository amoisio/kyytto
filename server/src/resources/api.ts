import { apiBuilder } from 'kyytto-models';
import { options } from '../options.js';

/**
 * Global specification of the Kyyttö API.
 */
export const api = apiBuilder(`${options.apiServerHost}:${options.apiServerPort}`);
