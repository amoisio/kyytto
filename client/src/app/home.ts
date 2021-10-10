import { ResourceDto } from "./resource-dto";

export class HomeDto extends ResourceDto {
    public learning !: LinkDto;
    public hours !: LinkDto;
    public todos !: LinkDto;
}

export class LinkDto extends ResourceDto {
    public title !: string;
}