import { IResource } from './iresource';

export default interface ILink extends IResource {
    href: string;
    title: string;
    icon: string;
}