import { IResource } from "../iresource";

export class HourNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: HourNoteDto[];
}

export class HourNoteDto implements IResource {
    public href !: string;
    public rel !: string;
    public date !: Date;
    public details !: HourDetailDto;
}

export class HourDetailDto {
    public description !: string;
    public estimate ?: number;
}
