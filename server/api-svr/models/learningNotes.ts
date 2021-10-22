import { IResource } from "./iresource";

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
}