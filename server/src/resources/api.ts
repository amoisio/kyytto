import { buildApi } from 'kyytto-models';
import { options } from '../options.js';

/**
 * Global specification of the Kyyttö API.
 */
export const api = buildApi(`${options.apiServerHost}:${options.apiServerPort}`);
