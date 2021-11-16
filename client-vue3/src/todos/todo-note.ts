import { IInitializable } from '../iinitializable';
import { IResource } from '../iresource';

export class TodoNoteDto implements IResource {
    public href !: string;
    public rel !: string;
    public description !: string;
    public done !: boolean;

    constructor(note: TodoNote) {
      this.href = note.href;
      this.rel = note.rel;
      this.description = note.description;
      this.done = note.done;
    }
}

export class TodoNotesDto implements IResource {
    public href !: string;
    public rel !: string;
    public notes !: TodoNoteDto[];
}

export class TodoNote implements IResource, IInitializable<TodoNoteDto, TodoNote> {
    public href !: string;
    public rel !: string;
    public description !: string;
    public done !: boolean;

    public init(input: TodoNoteDto): TodoNote {
      this.href = input.href;
      this.rel = input.rel;
      this.description = input.description;
      this.done = input.done;
      return this;
    }
}

export class NewTodoNote {
    public description !: string;
}
