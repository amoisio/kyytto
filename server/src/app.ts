import express, { Express } from 'express';
import logger from 'morgan';
import { router as unitOfWorkMiddleware } from './middlewares/unit-of-work-middleware.js';
import { router as servicesMiddleware } from './middlewares/services-middleware.js';
import { router as menuRoutes } from './resources/menu/routes.js';
import { router as projectRoutes } from './resources/projects/routes.js';
import { router as taskRoutes } from './resources/tasks/routes.js';
import { options } from './options.js';

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', options.corsAllowOrigin);
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

app.use(unitOfWorkMiddleware);
app.use(servicesMiddleware);
app.use(menuRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
