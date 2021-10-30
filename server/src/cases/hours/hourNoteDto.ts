import LinkBuilder from "../../lib/linkBuilder";
import { IResource } from "../../lib/iresource";
import { HourDetail, HourNote } from "./hourNote";

export class HourNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: HourNoteDto[];

    public static createFrom(notes: HourNote[], builder: LinkBuilder): HourNotesDto {
        const dto = new HourNotesDto();
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.notes = notes.map(note => HourNoteDto.createFrom(note, builder.addSegment(note.id)));
        return dto;
    }
}

export class HourNoteDto implements IResource {
    public href !: string;
    public rel !: string;
    public date !: Date;
    public details !: HourDetailDto[];

    public static createFrom(note: HourNote, builder: LinkBuilder): HourNoteDto {
        const dto = new HourNoteDto;
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.date = note.date;
        dto.details = note.details.map(detail => HourDetailDto.createFrom(detail));
        return dto;
    }

    public toEntity(): HourNote {
        const id = LinkBuilder.lastSegment(this.href);
        const entity = new HourNote(id, this.date);
        for (let detail of this.details) {
            entity.addDetail(detail.description, detail.estimate);
        }
        return entity;
    }
}

export class HourDetailDto {
    public description !: string;
    public estimate ?: number;

    public static createFrom(detail: HourDetail): HourDetailDto {
        const dto = new HourDetailDto;
        dto.description = detail.description;
        dto.estimate = detail.estimate;
        return dto;
    }
}
