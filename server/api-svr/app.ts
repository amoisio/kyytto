import express, { Express } from 'express';
import * as mysql from 'mysql';
import LinkBuilder, * as links from './lib/linkBuilder';
import logger from 'morgan';
import LearningNoteRepository from './cases/learning/learningNoteRepository';
import { LearningNotesDto } from './cases/learning/learningNoteDto';

// const createError = require('http-errors');
// const path = require('path');

// const todoRepository = require('./lib/todoNoteRepo');
// const bugsRepository = require('./lib/bugs');
// const usersRepository = require('./lib/users');

// const indexRoutes = require('./routes/index');
// const todoRoutes = require('./routes/todoNotes');
// const learningRoutes = require('./routes/learningNotes');
// const bugRoutes = require('./routes/bug');


const connection: mysql.Connection = mysql.createConnection({
  host: process.env['SQL_HOST'],
  user: process.env['SQL_USERNAME'],
  password: process.env['SQL_PASSWORD'],
  database: process.env['SQL_DATABASE']
});

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

// app.use('/', indexRoutes);

// app.get('/', indexRoutes.getRoot());

// app.get('/todos', (req, res, next) => {

// });


// app.get('/todos', todoRoutes.getTodoNotes(
//   todoRepository.getTodoNotes(connection)));

app.get('/learning', async (req, res) => {
  const builder = new LinkBuilder(process.env['API_SVR_HOST']!, '.json');
  const repo = new LearningNoteRepository(connection);
  const notes = await repo.getAll();
  const dtos = LearningNotesDto.CreateFrom(notes, builder.addSegment('/learning'));
  res.json(dtos);
});

// app.get('/bugs/:pagekey', bugsRoutes.getPage(
//   bugsRepository.getBugsPage(connection)));

// app.post('/bugs', bugsRoutes.postBug(
//   bugRepository.saveBug(connection)));

// app.get('/bug/:bugid', bugRoutes.getBug(
//   bugRepository.getBug(connection)));

// app.put('/bug/:bugid', bugRoutes.putBug(
//   bugRepository.saveBug(connection)));


module.exports = app;
  