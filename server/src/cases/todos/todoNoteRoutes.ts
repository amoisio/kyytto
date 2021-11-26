import express from 'express';
import { unitOfWork } from '../../lib/mysql/unitOfWork';
import { getLinkBuilder } from '../../lib/utilities';
import { v4 as uuidv4 } from 'uuid';
import { TodoNoteDto, TodoNotesDto } from './todoNoteDto';
import { NewTodoDto } from './newTodoDto';
import { TodoNote } from './todoNote';

export const router = express.Router();

router.get('/todos', async (req, res) => {
    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.todoNoteRepository;
    const notes = await repo.getAll();
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = TodoNotesDto.createFrom(notes, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.get('/todos/:id', async (req, res) => {
    const id = req.params['id'];

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.todoNoteRepository;
    const note = await repo.get(id);
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = TodoNoteDto.createFrom(note, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.post('/todos', async (req, res) => {
    const input = req.body as NewTodoDto;
    const note = new TodoNote(uuidv4(), input.description, false);

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.todoNoteRepository;
    const id = await repo.create(note);
    await uow.closeSession();

    res.redirect(`/todos/${id}`);
});

router.put('/todos/:id', async (req, res) => {
    const input = req.body as TodoNoteDto;
    const note = input.toEntity();

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.todoNoteRepository;
    await repo.update(note);
    await uow.closeSession();
    res.end();
});