import express, { Express } from 'express';
import * as mysql from 'mysql';
import LinkBuilder, * as links from './lib/linkBuilder';
import logger from 'morgan';

import LearningNoteRepository from './cases/learning/learningNoteRepository';
import { LearningNotesDto } from './cases/learning/learningNoteDto';
import TodoNoteRepository from './cases/todos/todoNoteRepository';
import { TodoNotesDto } from './cases/todos/todoNoteDto';
import HourNoteRepository from './cases/hours/hourNoteRepository';
import { HourNotesDto } from './cases/hours/hourNoteDto';
import { PageDto } from './cases/navigation/pageDto';

const connection: mysql.Connection = mysql.createConnection({
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

app.get('/', (req, res) => {
  const builder = new LinkBuilder(process.env['API_SVR_HOST']!, '.json');
  const dto = PageDto.Create('index', builder);
  dto.pages.push(PageDto.Create("todos", builder.withSegments('/todos')));
  dto.pages.push(PageDto.Create("hours", builder.withSegments('/hours')));
  dto.pages.push(PageDto.Create("learning", builder.withSegments('/learning')));
  res.json(dto);
});

app.get('/hours', async (req, res) => {
  const builder = new LinkBuilder(process.env['API_SVR_HOST']!, '.json');
  const repo = new HourNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = HourNotesDto.CreateFrom(notes, builder.addSegment(req.baseUrl));
  res.json(dtos);
});

app.get('/todos', async (req, res) => {
  const builder = new LinkBuilder(process.env['API_SVR_HOST']!, '.json');
  const repo = new TodoNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = TodoNotesDto.CreateFrom(notes, builder.addSegment(req.baseUrl));
  res.json(dtos);
});

app.get('/learning', async (req, res) => {
  const builder = new LinkBuilder(process.env['API_SVR_HOST']!, '.json');
  const repo = new LearningNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = LearningNotesDto.CreateFrom(notes, builder.addSegment(req.baseUrl));
  res.json(dtos);
});  