import { IResource } from "./iresource";

export class TodoNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: TodoNoteDto[];
}

export class TodoNoteDto implements IResource {
    public href !: string;
    public rel !: string;
    public description !: string;
    public done !: boolean;
}
