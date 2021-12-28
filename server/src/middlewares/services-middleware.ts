import express from 'express';
import { ProjectBuilder } from '../resources/projects/project.js';
import { TaskBuilder } from '../resources/tasks/task.js';
import { NextUnusedColorGenerator } from '../utilities/color-generator.js';
import { UuidGenerator } from '../utilities/identifier-generator.js';

export const router = express.Router();

router.use(async(req, res, next) => {
  req.colorGenerator= new NextUnusedColorGenerator(req.unitOfWork);
  req.idGenerator = new UuidGenerator();
  req.projectBuilder = new ProjectBuilder(req.idGenerator, req.colorGenerator);
  req.taskBuilder = new TaskBuilder(req.idGenerator, req.unitOfWork);
  next();
});
