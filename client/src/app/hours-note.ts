import { INote } from "./inote";

export class HoursNote implements INote {
    public topic?: string;
    public details?: string[];
    public date !: Date;
}
