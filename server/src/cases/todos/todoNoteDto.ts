import LinkBuilder from "../../lib/linkBuilder";
import { IResource } from "../../lib/iresource";
import { TodoNote } from "./todoNote";

export class TodoNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: TodoNoteDto[];

    public static createFrom(notes: TodoNote[], builder: LinkBuilder): TodoNotesDto{
        const dto = new TodoNotesDto();
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.notes = notes.map(note => TodoNoteDto.createFrom(note, builder.addSegment(note.id)));
        return dto;
    }
}

export class TodoNoteDto implements IResource {
    public href !: string;
    public rel !: string;
    public description !: string;
    public done !: boolean;

    public static createFrom(note: TodoNote, builder: LinkBuilder): TodoNoteDto {
        const dto = new TodoNoteDto;
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.description = note.description;
        dto.done = note.done;
        return dto;
    }

    public toEntity(): TodoNote {
        const id = LinkBuilder.lastSegment(this.href);
        const entity = new TodoNote(id, this.description, this.done);
        return entity;
    }

}
