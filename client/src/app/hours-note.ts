import { ISerializable } from "./iserializable";

export class HoursNote implements ISerializable<HoursNote> {
    public date : Date = new Date();
    public readonly details : HourItem[] = [];
 
    public add(description: string, estimate ?: number) {
        const item = new HourItem();
        item.description = description;
        item.estimate = estimate;
        this.details.push(item);
    }

    public totalEstimate(): number {
        return this.details
            .map(d => d.estimate ?? 0)
            .reduce((prev, cur) => prev + cur);
    }

    public deserialize(input: any): HoursNote {
        this.date = input.date;
        for(let item of input.details) {
            this.details.push(new HourItem().deserialize(item));
        }
        return this;
    }
}

export class HourItem implements ISerializable<HourItem> {
    public description : string = '';
    public estimate ?: number;

    public deserialize(input: any): HourItem {
        this.description = input.description;
        this.estimate = input.estimate;
        return this;
    }
}