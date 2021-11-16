import { IInitializable } from '../iinitializable';
import { IResource } from '../iresource';

export class LearningNoteDto implements IResource {
  public href!: string;
  public rel!: string;
  public topic!: string;
  public details!: string[];
  public isArchived !: boolean;
  constructor(note: LearningNote) {
    this.href = note.href;
    this.rel = note.rel;
    this.topic = note.topic;
    this.details = note.details.map((d) => d);
    this.isArchived = note.isArchived;
  }
}

export class LearningNotesDto implements IResource {
  public href!: string;
  public rel!: string;
  public notes!: LearningNoteDto[];
}

export class LearningNote implements IResource, IInitializable<LearningNoteDto, LearningNote> {
  public href!: string;
  public rel!: string;
  public topic!: string;
  public details : string[] = [];
  public isArchived !: boolean;
  public add(detail: string) : void {
    this.details.push(detail);
  }

  public init(input: LearningNoteDto): LearningNote {
    this.href = input.href;
    this.rel = input.rel;
    this.topic = input.topic;
    this.details = input.details.map((d) => d);
    this.isArchived = input.isArchived;
    return this;
  }
}

export interface INewLearningNote {
  topic : string;
  detail : string;
}
