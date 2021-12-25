import express, { Express } from 'express';
import logger from 'morgan';
import { router as unitOfWorkMiddleware } from './unit-of-work-middleware.js';
import { router as menuRoutes } from './cases/menu/routes.js';
import { router as projectRoutes } from './cases/projects/routes.js';
import { router as taskRoutes } from './cases/tasks/routes.js';
import { options } from './options.js';


export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', options.corsAllowOrigin);
  next();
});

app.use(unitOfWorkMiddleware);
app.use(menuRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

