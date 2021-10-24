export default class LinkBuilder {
    constructor (
        private base : string,
        private extension ?: string
    ) {}

    private segments: string[] = [];
    private query: string[][] = [[]];

    public addSegment(segment: string) : LinkBuilder {
        this.segments.push(segment);
        return this;
    }
    public withSegments(...segments: string[]): LinkBuilder {
        this.segments = segments.map(s => s);
        return this;
    }

    public addQuery(pair: [string, string]): LinkBuilder {
        this.query.push(pair);
        return this;
    };
    public overrideExtension(extension: string): LinkBuilder {
        this.extension = extension;
        return this;
    }
    public toString(): string {
        return this.toUrl().toString();
    };
    public toPathname(): string {
        return this.toUrl().pathname;
    }
    private toUrl(): URL {
        let path = this.segments.join('/');
        if (this.extension) {
            if (path === '' || path === '/') {
                path = 'index';
            }
            path = path.concat(this.extension);
        }

        const u = new URL(path, this.base);
        u.search = this.query.map(pair => pair.join('=')).join('&');
        return u;
    }   
}

export const lastSegment = (id: string): string => {
    const fragments = id.split('/');
    const t = fragments[fragments.length - 1];
    if(t.indexOf('.') > 0){
        return t.slice(0, t.indexOf('.'));
    }
    return t;
};