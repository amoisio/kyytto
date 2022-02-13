import express from 'express';
import { api, TaskDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';

export const router = express.Router();

router.route(api.tasks.path)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const repository = req.unitOfWork.taskRepository;
    const tasks = await repository.getAll();
    const resources = tasks.map(task => task.toResource(baseUrl));
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

router.route(api.tasks.byId.path)
  .all(idParser)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const id = req.id;
    const repository = req.unitOfWork.taskRepository;
    const task = await repository.getById(id);
    const resource = task.toResource(baseUrl);
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
