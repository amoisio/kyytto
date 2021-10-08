import { INote } from "./inote";

export class TodoNote implements INote {
    public topic?: string;
    public details?: string[];
    public done !: boolean;
}
