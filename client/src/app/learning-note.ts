import { INote } from "./inote";

export class LearningNote implements INote {
    public topic ?: string;
    public details ?: string[];
}
