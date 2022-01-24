import express from 'express';
import { TagBuilder } from '../resources/tags/tag.js';
import { ProjectBuilder } from '../resources/projects/project.js';
import { TaskBuilder } from '../resources/tasks/task.js';
import { NextUnusedColorGenerator } from '../utilities/color-generator.js';
import { UuidGenerator } from '../utilities/identifier-generator.js';
import { TagService } from '../resources/tags/tag-service.js';
import { StackBuilder } from 'resources/stacks/stack.js';

export const router = express.Router();

router.use(async(req, res, next) => {
  req.colorGenerator= new NextUnusedColorGenerator(req.unitOfWork);
  req.idGenerator = new UuidGenerator();
  req.projectBuilder = new ProjectBuilder(req.idGenerator, req.colorGenerator);
  req.taskBuilder = new TaskBuilder(req.idGenerator, req.unitOfWork);
  req.tagBuilder = new TagBuilder(req.idGenerator);
  req.tagService = new TagService(req.unitOfWork);
  req.stackBuilder = new StackBuilder(req.idGenerator, req.unitOfWork);
  next();
});
