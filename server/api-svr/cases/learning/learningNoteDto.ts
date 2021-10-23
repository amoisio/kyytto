import { IResource } from "../iresource";
import { LearningDetail, LearningNote } from "./learningNote";
import LinkBuilder from "../../lib/linkBuilder";

export class LearningNotesDto implements IResource {
    public href !: string;
    public rel!: string;
    public notes !: LearningNoteDto[];
}

export class LearningNoteDto implements IResource {
    public href !: string;
    public rel!: string;
    public topic !: string;
    public details !: string[];
}

// export const notesMapper = R.curry((builder: LinkBuilder, notes: LearningNote[]): LearningNotesDto => {
//     const dtos = notes.map(note => noteMapper(builder, note));
// }

// export const noteMapper = R.curry((builder: LinkBuilder, note: LearningNote) : LearningNoteDto => {
//     const dto = new LearningNoteDto;
//     dto.href = builder.addSegment('learning').toString();
//     const dto = {
//         href: 
//         rel: '/learning',
//         notes: R.map(r => {
//             return {
//                 id: lb.addSegment(r.id).toString(),
//                 topic: r.topic,

//                 createdBy: r.createdBy,
//                 createdOn: r.createdOn,
//                 modifiedOn: r.modifiedOn
//             }
//         }, results.items)
//     };
// });

// export const detailMapper = (detail: LearningDetail): string => 
//     detail.description;
