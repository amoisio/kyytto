import { ISerializable } from "./iserializable";

export class LearningNote implements ISerializable<LearningNote> {
    public topic : string = '';
    public readonly details : string[] = [];
    
    public add(detail: string) {
        this.details.push(detail);
    }

    public deserialize(input: any): LearningNote {
        this.topic = input.topic;
        for (let detail of input.details) {
            this.details.push(detail);
        }
        return this;
    }
}