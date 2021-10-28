import { IResource } from "../iresource";
import { LearningNote } from "./learningNote";
import LinkBuilder from "../../lib/linkBuilder";

export class LearningNotesDto implements IResource {
    public href !: string;
    public rel!: string;
    public notes !: LearningNoteDto[];

    public static CreateFrom(notes: LearningNote[], builder: LinkBuilder): LearningNotesDto {
        const dto = new LearningNotesDto();
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.notes = notes.map(note => LearningNoteDto.createFrom(note, builder.addSegment(note.id)));
        return dto;
    }
}

export class LearningNoteDto implements IResource {
    public href !: string;
    public rel!: string;
    public topic !: string;
    public details !: string[];

    public static createFrom(note: LearningNote, builder: LinkBuilder): LearningNoteDto {
        const dto = new LearningNoteDto;
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.topic = note.topic;
        dto.details = note.details.map(detail => detail.description);
        return dto;
    }

    public toEntity(): LearningNote {
        const id = LinkBuilder.lastSegment(this.href);
        const entity = new LearningNote(id, this.topic);
        for(let detail of this.details) {
            entity.addDetail(detail);
        }
        return entity;
    }
}