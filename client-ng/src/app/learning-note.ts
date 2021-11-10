import { IInitializable } from "./iinitializable";
import { IResource } from "./iresource";

export class LearningNote implements IResource, IInitializable<LearningNoteDto, LearningNote> {
    public href !: string;
    public rel!: string;
    public topic !: string;
    public details !: string[];
    
    public add(detail: string) {
        this.details.push(detail);
    }

    public init(input: LearningNoteDto): LearningNote {
        this.href = input.href;
        this.rel = input.rel;
        this.topic = input.topic;
        this.details = input.details.map(d => d);
        return this;
    }
}

export class LearningNotesDto implements IResource {
    public href !: string;
    public rel!: string;
    public notes !: LearningNoteDto[];
}

export class LearningNoteDto implements IResource {
    public href !: string;
    public rel!: string;
    public topic !: string;
    public details !: string[];

    constructor(note: LearningNote) {
        this.href = note.href;
        this.rel = note.rel;
        this.topic = note.topic;
        this.details = note.details.map(d => d);
    }
}