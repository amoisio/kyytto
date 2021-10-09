import { INote } from "./inote";

export class HoursNote implements INote {
    public date : Date = new Date();
    public details : { description: string, estimate ?: number }[] = [];

    public validate(): boolean {
        return this.details.length > 0
            && !this.details.some(d => d.description.length == 0);
    }
}
