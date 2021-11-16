import { INewTodoNote, TodoNote } from './todo-note';
import { v4 as uuidv4 } from 'uuid';

export interface ITodoService {
    create(newNote: INewTodoNote): TodoNote;
    getNotes(): TodoNote[];
    complete(note: TodoNote): void;
}

export class TodoService implements ITodoService {
  private readonly notes: TodoNote[] = [];

  public create(newNote: INewTodoNote): TodoNote {
    const item = new TodoNote();
    const id = uuidv4();
    item.description = newNote.description;
    item.done = false;
    item.rel = `/todos/${id}`;
    item.href = `/todos/${id}`;
    return item;
  }

  public getNotes(): TodoNote[] {
    const notesString = JSON.stringify(this.notes);
    return JSON.parse(notesString);
  }

  public complete(note: TodoNote): void {
    const match = this.notes.find(item => item.href === note.href);
    if (match !== undefined) {
        match.done = true;
    }
  }
}
