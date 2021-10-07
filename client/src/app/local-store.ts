export class LocalStore<T> {

    constructor(private readonly repoName: string) { }

    public get(): T[] {
        const val = localStorage.getItem(this.repoName);
        if (val) {
            return JSON.parse(val) as T[];
        } else {
            return [];
        }
    }

    public set(items: T[]) {
        const val = JSON.stringify(items);
        localStorage.setItem(this.repoName, val);
    }

    public clear() {
        this.set([]);
    }
}
