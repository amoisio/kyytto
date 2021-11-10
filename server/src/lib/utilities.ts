import LinkBuilder from './linkBuilder';

export const getLinkBuilder = (): LinkBuilder => {
    const host = process.env['API_SERVER_HOST']!;
    const port = process.env['API_SERVER_PORT']!;
    const builder = new LinkBuilder(host, port);
    return builder;
}
