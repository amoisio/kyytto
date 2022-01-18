import express from 'express';
import { api } from '../api.js';
import { Identifier, TaskResource } from 'kyytto-models';

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
    if (projectId === undefined) {
      res.sendStatus(400);
      return;
    }
    
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
    const task = await repository.getById(Identifier.build(id));
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
    await repository.delete(Identifier.build(id));

    res.end();
  });

router.route(`${api.tasks.path}/migration`)
  .post(async (req, res) => {
    const resource = req.body as TaskResource;
    const builder = req.taskBuilder;
    const project = await builder.from(resource);

    const repository = req.unitOfWork.taskRepository;
    await repository.add(project);

    res.end();
  });