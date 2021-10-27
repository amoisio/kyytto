import express, { Express } from 'express';
import logger from 'morgan';
import { router as indexRoutes } from './cases/navigation/indexRoutes';
import { router as hourNoteRoutes } from './cases/hours/hourNoteRoutes';

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

app.use(indexRoutes);
app.use(hourNoteRoutes);

// 

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