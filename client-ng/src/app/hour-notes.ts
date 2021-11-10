import { IInitializable } from "./iinitializable";
import { IResource } from "./iresource";

export class HourNote implements IResource, IInitializable<HourNoteDto, HourNote> {
    public href !: string;
    public rel !: string;
    public date !: Date;
    public details !: Array<{ description : string, estimate ?:number }>;

    constructor(date : Date, description ?: string, estimate ?: number) {
        this.date = date;
        this.details = [];
        if (description) {
            this.details.push({ description, estimate });
        }
    }

    public addDetail(description: string, estimate?: number) {
        this.details.push({
            description: description,
            estimate: estimate
        });
    }

    public totalEstimate(): number {
        return this.details
            .map(d => d.estimate ?? 0)
            .reduce((prev, cur) => prev + cur);
    }

    public init(input: HourNoteDto): HourNote {
        this.href = input.href;
        this.rel = input.rel;
        this.date = input.date;
        for (let item of input.details) {
            this.details.push({ 
                description: item.description, 
                estimate: item.estimate 
            });
        }
        return this;
    }

    public validate(): boolean {
        return !!this.date && this.details.length > 0;
    }
}

export class HourNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: HourNoteDto[];
}

export class HourNoteDto implements IResource  {
    public href !: string;
    public rel !: string;
    public date !: Date;
    public details !: Array<{ description: string, estimate?: number }>;

    constructor(note: HourNote) {
        this.href = note.href;
        this.rel = note.rel;
        this.date = note.date;
        this.details = note.details
            .map(d => {
                return {
                    description: d.description,
                    estimate: d.estimate
                }
            });
    }
}
