import { ISerializable } from "./iserializable";
import { ResourceDto } from "./resource-dto";

export class LearningNote extends ResourceDto implements ISerializable<LearningNote> {
    public topic : string = '';
    public readonly details : string[] = [];
    
    public add(detail: string) {
        this.details.push(detail);
    }

    public deserialize(input: any): LearningNote {
        this.href = input.href;
        this.rel = input.rel;
        this.topic = input.topic;
        for (let detail of input.details) {
            this.details.push(detail);
        }
        return this;
    }
}