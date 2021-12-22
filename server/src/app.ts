import express, { Express } from 'express';
import logger from 'morgan';
import { router as mySqlUnitOfWorkMiddleware } from './lib/mysql/unit-of-work-middleware.js';
import { router as lowDbUnitOfWorkMiddleware } from './lib/lowdb/unit-of-work-middleware.js';
import { router as menuRoutes } from './cases/menu/routes.js';
import { router as projectRoutes } from './cases/projects/routes.js';
import { router as taskRoutes } from './cases/tasks/routes.js';

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

// app.use(mySqlUnitOfWorkMiddleware);
app.use(lowDbUnitOfWorkMiddleware);
app.use(menuRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
