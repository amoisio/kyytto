import express, { Express } from 'express';
import logger from 'morgan';
import { router as indexRoutes } from './cases/navigation/indexRoutes';
import { router as hourNoteRoutes } from './cases/hours/hourNoteRoutes';
import { router as learningNoteRoutes } from './cases/learning/learningNoteRoutes';
import { router as todoNoteRoutes } from './cases/todos/todoNoteRoutes';

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
app.use(learningNoteRoutes);
app.use(todoNoteRoutes);