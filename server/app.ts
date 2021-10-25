import express, { Express } from 'express';
import * as mysql from 'mysql';
import LinkBuilder, * as links from './lib/linkBuilder';
import logger from 'morgan';

import LearningNoteRepository from './cases/learning/learningNoteRepository';
import { LearningNotesDto } from './cases/learning/learningNoteDto';
import TodoNoteRepository from './cases/todos/todoNoteRepository';
import { TodoNoteDto, TodoNotesDto } from './cases/todos/todoNoteDto';
import HourNoteRepository from './cases/hours/hourNoteRepository';
import { HourNotesDto } from './cases/hours/hourNoteDto';
import { PageDto } from './cases/navigation/pageDto';
import { TodoNote } from './cases/todos/todoNote';
import { NewTodo } from './cases/todos/newTodo';

const connection: mysql.Connection = mysql.createConnection({
  host: process.env['SQL_HOST'],
  user: process.env['SQL_USERNAME'],
  password: process.env['SQL_PASSWORD'],
  database: process.env['SQL_DATABASE']
});

const getLinkBuilder = (): LinkBuilder => {
  const host = process.env['API_SERVER_HOST']!;
  const port = process.env['API_SERVER_PORT']!;
  const builder = new LinkBuilder(host, port);
  return builder;
}

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

app.get('/', (req, res) => {
  const builder = getLinkBuilder();
  const dto = PageDto.Create('index', builder);
  dto.pages = [];
  dto.pages.push(PageDto.Create("todos", builder.addSegment('/todos')));
  dto.pages.push(PageDto.Create("hours", builder.addSegment('/hours')));
  dto.pages.push(PageDto.Create("learning", builder.addSegment('/learning')));
  res.json(dto);
});

app.get('/hours', async (req, res) => {
  const builder = getLinkBuilder();
  const repo = new HourNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = HourNotesDto.CreateFrom(notes, builder.addSegment(req.originalUrl));
  res.json(dtos);
});

// Get all todo notes
app.get('/todos', async (req, res) => {
  const builder = getLinkBuilder();
  const repo = new TodoNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = TodoNotesDto.CreateFrom(notes, builder.addSegment(req.originalUrl));
  res.json(dtos);
});

// Get a single todo note
app.get('/todos/:id', async (req, res) => {
  const builder = getLinkBuilder();
  const repo = new TodoNoteRepository(connection);
  const id = req.params['id'];
  const note = await repo.get(id);
  const dto = TodoNoteDto.CreateFrom(note, builder.addSegment(req.originalUrl));
  res.json(dto);
});

// Create a new todo note => redirect to get the new note
app.post('/todos', async (req, res) => {
  const todo = req.body as NewTodo;
  const repo = new TodoNoteRepository(connection);
  const id = await repo.create(todo.description);
  res.redirect(`/todos/${id}`);
});

// Update an note
app.put('/todos/:id', async (req, res) => {
  const id = req.params['id'];
  const repo = new TodoNoteRepository(connection);
  const note = req.body as TodoNote;
  await repo.update(note);
});

app.get('/learning', async (req, res) => {
  const builder = getLinkBuilder();
  const repo = new LearningNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = LearningNotesDto.CreateFrom(notes, builder.addSegment(req.originalUrl));
  res.json(dtos);
});  