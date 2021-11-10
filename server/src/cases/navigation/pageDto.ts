import LinkBuilder from "../../lib/linkBuilder";
import { IResource } from "../../lib/iResource";

export class PageDto implements IResource {

    public href !: string;
    public rel !: string;
    public title !: string;
    public pages ?: PageDto[];

    public static create(title: string, builder: LinkBuilder): PageDto {
        const dto = new PageDto;
        dto.href = builder.toString();
        dto.rel = builder.toPathname();
        dto.title = title;
        return dto;
    }
}