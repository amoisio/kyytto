import { INote } from "./inote";

export class TodoNote implements INote {
    public description: string = '';
    public done : boolean = false;

    public validate(): boolean {
        return this.description.length > 0;
    }
}
