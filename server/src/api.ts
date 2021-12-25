import { buildApi } from 'kyytto-models';
import { options } from './options.js';

export const api = buildApi(`${options.apiServerHost}:${options.apiServerPort}`);
