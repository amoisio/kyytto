import express, { Express } from 'express';
import logger from 'morgan';
import { router as unitOfWorkMiddleware } from './middlewares/unit-of-work-middleware.js';
import { router as servicesMiddleware } from './middlewares/services-middleware.js';
import { router as menuRoutes } from './resources/menu/routes.js';
import { router as projectRoutes } from './resources/projects/routes.js';
import { router as taskRoutes } from './resources/tasks/routes.js';
import { router as tagRoutes } from './resources/tags/routes.js';
import { router as stackRoutes } from './resources/stacks/routes.js';
import { router as userRoutes } from './resources/users/routes.js';
import { handler as cors } from './middlewares/cors-middleware.js';

export const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

app.use(unitOfWorkMiddleware);
app.use(servicesMiddleware);
app.use(menuRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.use(tagRoutes);
app.use(stackRoutes);
app.use(userRoutes);
