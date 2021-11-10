import { HourNote } from "../cases/hours/hourNote";
import { LearningNote } from "../cases/learning/learningNote";
import { TodoNote } from "../cases/todos/todoNote";
import IRepository from "./iRepository";

export default interface IUnitOfWork {
    hourNoteRepository: IRepository<HourNote>;
    learningNoteRepository : IRepository<LearningNote>;
    todoNoteRepository : IRepository<TodoNote>;

    startSession(): Promise<void>;
    closeSession(): Promise<void>;
}