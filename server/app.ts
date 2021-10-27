import express, { Express } from 'express';
import * as mysql from 'mysql2/promise';
import LinkBuilder, * as links from './lib/linkBuilder';
import logger from 'morgan';
import { v4 as uuidv4 } from 'uuid';

import LearningNoteRepository from './cases/learning/learningNoteRepository';
import { LearningNotesDto } from './cases/learning/learningNoteDto';
import TodoNoteRepository from './cases/todos/todoNoteRepository';
import { TodoNoteDto, TodoNotesDto } from './cases/todos/todoNoteDto';
import HourNoteRepository from './cases/hours/hourNoteRepository';
import { HourNoteDto, HourNotesDto } from './cases/hours/hourNoteDto';
import { PageDto } from './cases/navigation/pageDto';
import { TodoNote } from './cases/todos/todoNote';
import { NewTodo } from './cases/todos/newTodo';
import UnitOfWork from './lib/unitOfWork';
import { NewHour } from './cases/hours/newHour';
import { HourDetail, HourNote } from './cases/hours/hourNote';

const getLinkBuilder = (): LinkBuilder => {
  const host = process.env['API_SERVER_HOST']!;
  const port = process.env['API_SERVER_PORT']!;
  const builder = new LinkBuilder(host, port);
  return builder;
}

const connectionFactory = (): Promise<mysql.Connection> => mysql.createConnection({
  host: process.env['SQL_HOST'],
  user: process.env['SQL_USERNAME'],
  password: process.env['SQL_PASSWORD'],
  database: process.env['SQL_DATABASE']
});

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

app.use((req, res, next) => {
  req.app.locals['link-builder'] = getLinkBuilder();
  next();
});


app.get('/', (req, res) => {
  const lb = req.app.locals['link-builder'] as LinkBuilder;
  const dto = PageDto.Create('index', lb);
  dto.pages = [];
  dto.pages.push(PageDto.Create("todos", lb.addSegment('/todos')));
  dto.pages.push(PageDto.Create("hours", lb.addSegment('/hours')));
  dto.pages.push(PageDto.Create("learning", lb.addSegment('/learning')));
  res.json(dto);
});

app.get('/hours', async (req, res) => {
  const uow = await UnitOfWork.startSession(connectionFactory);
  const repo = uow.hourNoteRepository;
  const notes = await repo.getAll();
  await uow.closeSession();
  
  const lb = req.app.locals['link-builder'] as LinkBuilder;
  const dtos = HourNotesDto.CreateFrom(notes, lb.addSegment(req.originalUrl));
  res.json(dtos);
});

app.get('/hours/:id', async (req, res) => {
  const id = req.params['id'];
  
  const uow = await UnitOfWork.startSession(connectionFactory);
  const repo = uow.hourNoteRepository;
  const note = await repo.get(id);
  await uow.closeSession();

  const lb = req.app.locals['link-builder'] as LinkBuilder;
  const dtos = HourNoteDto.CreateFrom(note, lb.addSegment(req.originalUrl));
  res.json(dtos);
});

app.post('/hours', async (req, res) => {
  const hour = req.body as NewHour;
  const note = new HourNote(uuidv4(), hour.date);
  note.addDetail(hour.description, hour.estimate);
  
  const uow = await UnitOfWork.startSession(connectionFactory);
  const repo = uow.hourNoteRepository;
  const id = await repo.create(note);
  await uow.closeSession();

  res.redirect(`/hours/${id}`);
});

// // Get all todo notes
// app.get('/todos', async (req, res) => {
//   const builder = req.app.locals['link-builder'] as LinkBuilder;
//   const repo = new TodoNoteRepository(connection);
//   const notes = await repo.getAll();
//   const dtos = TodoNotesDto.CreateFrom(notes, builder.addSegment(req.originalUrl));
//   res.json(dtos);
// });

// // Get a single todo note
// app.get('/todos/:id', async (req, res) => {
//   const builder = req.app.locals['link-builder'] as LinkBuilder;
//   const repo = new TodoNoteRepository(connection);
//   const id = req.params['id'];
//   const note = await repo.get(id);
//   const dto = TodoNoteDto.CreateFrom(note, builder.addSegment(req.originalUrl));
//   res.json(dto);
// });

// // Create a new todo note => redirect to get the new note
// app.post('/todos', async (req, res) => {
//   const todo = req.body as NewTodo;
//   const note = new TodoNote();
//   note.id = uuidv4();
//   note.description = todo.description;
//   const repo = new TodoNoteRepository(connection);
//   const id = await repo.create(note);
//   res.redirect(`/todos/${id}`);
// });

// // Update an note
// app.put('/todos/:id', async (req, res) => {
//   const id = req.params['id'];
//   const repo = new TodoNoteRepository(connection);
//   const note = req.body as TodoNote;
//   await repo.update(note);
// });

// app.get('/learning', async (req, res) => {
//   const builder = req.app.locals['link-builder'] as LinkBuilder;
//   const repo = new LearningNoteRepository(connection);
//   const notes = await repo.getAll();
//   const dtos = LearningNotesDto.CreateFrom(notes, builder.addSegment(req.originalUrl));
//   res.json(dtos);
// });  