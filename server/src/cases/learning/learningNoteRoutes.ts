import express from 'express';
import { unitOfWork } from '../../lib/mysql/mySqlUnitOfWork';
import { getLinkBuilder } from '../../lib/utilities';
import { v4 as uuidv4 } from 'uuid';
import { LearningNoteDto, LearningNotesDto } from './learningNoteDto';
import { NewLearningDto } from './newLearningDto';
import { LearningNote } from './learningNote';

export const router = express.Router();

router.get('/learning', async (req, res) => {
    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.learningNoteRepository;
    const notes = await repo.getAll();
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = LearningNotesDto.CreateFrom(notes, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.get('/learning/:id', async (req, res) => {
    const id = req.params['id'];

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.learningNoteRepository;
    const note = await repo.get(id);
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = LearningNoteDto.createFrom(note, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

router.post('/learning', async (req, res) => {
    const input = req.body as NewLearningDto;
    const note = new LearningNote(uuidv4(), input.topic);
    note.addDetail(input.description);

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.learningNoteRepository;
    const id = await repo.create(note);
    await uow.closeSession();

    res.redirect(`/learning/${id}`);
});

router.put('/learning/:id', async (req, res) => {
    const input = req.body as LearningNoteDto;
    const note = input.toEntity();

    const uow = unitOfWork();
    await uow.startSession();
    const repo = uow.learningNoteRepository;
    await repo.update(note);
    await uow.closeSession();
    res.end();
});