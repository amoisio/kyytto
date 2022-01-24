import express from 'express';
import { api } from '../api.js';
import { Identifier, TaskDto } from 'kyytto-models';
import { idValidation } from '../handlers.js';

export const router = express.Router();

router.route(api.tasks.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.taskRepository;
    const tasks = await repository.getAll();
    const resources = tasks.map(task => task.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const dto = req.body as TaskDto;
    if (dto === undefined || !Identifier.isValid(dto.projectId) || dto.tagIds.some(tagId => !Identifier.isValid(tagId))) {
      res.sendStatus(400);
      return;
    }
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
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.body as TaskDto;
    if (dto === undefined) {
      res.sendStatus(400);
      return;
    }
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
