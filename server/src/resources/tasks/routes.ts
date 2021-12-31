import express from 'express';
import { api } from '../api.js';
import { idBuilder, Identifier, TaskResource } from 'kyytto-models';

export const router = express.Router();

router.route(api.tasks.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.taskRepository;
    const tasks = await repository.getAll();
    const resources = tasks.map(task => task.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const resource = req.body as TaskResource;
    const builder = req.taskBuilder;
    const projectId = api.resolveId(resource.projectHref)
    const task = await builder.new(
      resource.title, 
      resource.description,
      projectId);

    const repository = req.unitOfWork.taskRepository;
    await repository.add(task);

    res.json(task.id);
  });

router.route(`${api.tasks.path}/:id`)
  .get(async (req, res) => {
    const id = req.params['id'];
    const repository = req.unitOfWork.taskRepository;
    const task = await repository.getById(idBuilder(id));
    const resource = task.toResource();

    res.json(resource);
  })
  .put(async (req, res) => {
    const resource = req.body as TaskResource;
    const builder = req.taskBuilder;
    const task = await builder.from(resource);

    const repository = req.unitOfWork.taskRepository;
    await repository.update(task);

    res.end();
  })
  .delete(async (req, res) => {
    const id = req.params['id'];
    const repository = req.unitOfWork.taskRepository;
    await repository.delete(idBuilder(id));

    res.end();
  });