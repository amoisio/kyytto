import { IResource } from './iresource';

export interface ILink extends IResource {
    href: string;
    title: string;
    icon: string;
}
