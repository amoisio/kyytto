import { ISerializable } from "./iserializable";

export class TodoNote implements ISerializable<TodoNote> {
    public description: string = '';
    public done : boolean = false

    public deserialize(input: any): TodoNote {
        this.description = input.description;
        this.done = input.done;
        return this;
    }
}