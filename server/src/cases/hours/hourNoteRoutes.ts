import express from 'express';
import { unitOfWork } from '../../lib/mysql/mySqlUnitOfWork';
import { getLinkBuilder } from '../../lib/utilities';
import { HourNote } from './hourNote';
import { HourNoteDto, HourNotesDto } from './hourNoteDto';
import { NewHourDto } from './newHourDto';
import { v4 as uuidv4 } from 'uuid';

export const router = express.Router();

router.get('/hours', async (req, res) => {
    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.hourNoteRepository;
    const notes = await repo.getAll();
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = HourNotesDto.createFrom(notes, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.get('/hours/:id', async (req, res) => {
    const id = req.params['id'];

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.hourNoteRepository;
    const note = await repo.get(id);
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = HourNoteDto.createFrom(note, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.post('/hours', async (req, res) => {
    const input = req.body as NewHourDto;
    const note = new HourNote(uuidv4(), input.date);
    note.addDetail(input.description, input.estimate);

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.hourNoteRepository;
    const id = await repo.create(note);
    await uow.closeSession();

    res.redirect(`/hours/${id}`);
});

router.put('/hours/:id', async (req, res) => {
    const input = req.body as HourNoteDto;
    const note = input.toEntity();

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.hourNoteRepository;
    await repo.update(note);
    await uow.closeSession();
    res.end();
});