import { buildApi } from 'kyytto-models';

export const api = buildApi(`${process.env['API_SERVER_HOST']}:${process.env['API_SERVER_PORT']}`);
