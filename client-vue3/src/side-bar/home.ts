import { IResource } from '../iresource';

export class LinkDto implements IResource {
    public href !: string;
    public rel !: string;
    public title !: string;
}

export class HomeDto implements IResource {
    public href !: string;
    public rel !: string;
    public learning !: LinkDto;
    public todos !: LinkDto;
}
