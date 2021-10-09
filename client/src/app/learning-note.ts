import { INote } from "./inote";

export class LearningNote implements INote {
    public topic : string = '';
    public details : string[] = [];

    public validate(): boolean {
        return this.topic.length > 0
            && this.details.length > 0;
    }
}
