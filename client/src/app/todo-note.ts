import { ISerializable } from "./iserializable";
import { ResourceDto } from "./resource-dto";

export class TodoNote extends ResourceDto implements ISerializable<TodoNote> {
    public description: string = '';
    public done : boolean = false

    public deserialize(input: any): TodoNote {
        this.href = input.href;
        this.rel = input.rel;
        this.description = input.description;
        this.done = input.done;
        return this;
    }
}