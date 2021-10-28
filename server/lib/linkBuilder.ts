export default class LinkBuilder {
    constructor (
        private base : string,
        private port : string = '80',
        private extension ?: string
    ) {}

    private segments: string[] = [];
    private query: string[][] = [[]];

    public addSegment(segment: string) : LinkBuilder {
        const copy = this.copy();
        copy.segments.push(segment); 
        return copy;
    }
    public addQuery(pair: [string, string]): LinkBuilder {
        const copy = this.copy();
        copy.query.push(pair);
        return copy;
    };
    public overrideExtension(extension: string): LinkBuilder {
        const copy = this.copy();
        copy.extension = extension;
        return copy;
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
        u.port = this.port;
        u.search = this.query.map(pair => pair.join('=')).join('&');
        return u;
    }
    private copy() : LinkBuilder {
        const builder = new LinkBuilder(this.base, this.port, this.extension);
        builder.segments = this.segments.map(s => s);
        builder.query = this.query.map(q => q.map(p => p));
        return builder;
    }

    public static lastSegment = (id: string): string => {
        const fragments = id.split('/');
        const t = fragments[fragments.length - 1];
        if (t.indexOf('.') > 0) {
            return t.slice(0, t.indexOf('.'));
        }
        return t;
    };
}

