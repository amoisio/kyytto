import express from 'express';
import UnitOfWork from '../../lib/unitOfWork';
import { connectionFactory, getLinkBuilder } from '../../lib/utilities';
import { v4 as uuidv4 } from 'uuid';
import { LearningNoteDto, LearningNotesDto } from './learningNoteDto';

export const router = express.Router();


router.get('/learning', async (req, res) => {
    const uow = await UnitOfWork.startSession(connectionFactory);
    const repo = uow.learningNoteRepository;
    const notes = await repo.getAll();
    await uow.closeSession();

    const lb = getLinkBuilder();
    const dtos = LearningNotesDto.CreateFrom(notes, lb.addSegment(req.originalUrl));
    res.json(dtos);
});

// router.get('/hours/:id', async (req, res) => {
//     const id = req.params['id'];

//     const uow = await UnitOfWork.startSession(connectionFactory);
//     const repo = uow.hourNoteRepository;
//     const note = await repo.get(id);
//     await uow.closeSession();

//     const lb = getLinkBuilder();
//     const dtos = HourNoteDto.CreateFrom(note, lb.addSegment(req.originalUrl));
//     res.json(dtos);
// });

// router.post('/hours', async (req, res) => {
//     const hour = req.body as NewHour;
//     const note = new HourNote(uuidv4(), hour.date);
//     note.addDetail(hour.description, hour.estimate);

//     const uow = await UnitOfWork.startSession(connectionFactory);
//     const repo = uow.hourNoteRepository;
//     const id = await repo.create(note);
//     await uow.closeSession();

//     res.redirect(`/hours/${id}`);
// });

// router.put('/hours/:id', async (req, res) => {
//     const note = req.body as HourNote;

//     const uow = await UnitOfWork.startSession(connectionFactory);
//     const repo = uow.hourNoteRepository;
//     await repo.update(note);
//     await uow.closeSession();
//     res.end();
// });