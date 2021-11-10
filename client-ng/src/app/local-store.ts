export class LocalStore {

    constructor(private readonly repoName: string) { }

    public get(): any[] {
        const val = localStorage.getItem(this.repoName);
        if (val) {
            return JSON.parse(val);
        } else {
            return [];
        }
    }

    public set(items: any[]) {
        const val = JSON.stringify(items);
        localStorage.setItem(this.repoName, val);
    }

    public clear() {
        this.set([]);
    }
}
