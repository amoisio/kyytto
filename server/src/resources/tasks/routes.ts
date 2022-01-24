import express from 'express';
import { api } from '../api.js';
import { TaskDto } from 'kyytto-models';
import { dtoParser, idValidation } from '../handlers.js';

export const router = express.Router();

router.route(api.tasks.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.taskRepository;
    const tasks = await repository.getAll();
    const resources = tasks.map(task => task.toResource());
    res.json(resources);
  })
  .post(dtoParser)
  .post(async (req, res) => {
    const dto = req.bodyAs<TaskDto>();
    const builder = req.taskBuilder;
    const task = await builder.new(dto);
    const repository = req.unitOfWork.taskRepository;
    await repository.add(task);
    res.json(task.id);
  });

router.route(`${api.tasks.path}/:id`)
  .all(idValidation)
  .get(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.taskRepository;
    const task = await repository.getById(id);
    const resource = task.toResource();
    res.json(resource);
  })
  .put(dtoParser)
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.bodyAs<TaskDto>();
    const builder = req.taskBuilder;
    const task = await builder.from(id, dto);
    const repository = req.unitOfWork.taskRepository;
    await repository.update(task);
    res.end();
  })
  .delete(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.taskRepository;
    await repository.delete(id);
    res.end();
  });
