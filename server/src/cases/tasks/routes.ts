import express from 'express';
import { unitOfWork } from '../../lib/mysql/unitOfWork';
import { api } from '../../api';
import { TaskResource } from 'kyytto-models';
import { Task } from './task';

export const router = express.Router();

router.use(async (req, res, next) => {
  req.unitOfWork = unitOfWork();
  await req.unitOfWork.startSession();
  res.once('finish', async () => await req.unitOfWork.closeSession());
  next();
});

router.route(api.tasks.path)
  .get(async (req, res) => {
    const repo = req.unitOfWork.taskRepository;
    const tasks = await repo.getAll();
    const dtos = tasks.map(task => task.toResource());
    res.json(dtos);
  })
  .post(async (req, res) => {
    const model = req.body as TaskResource;
    const task = await Task.createFrom(model, req.unitOfWork);
    const repo = req.unitOfWork.taskRepository;
    const id = await repo.create(task);
    res.redirect(`${api.tasks.path}/${id}`);
  });

router.route(`${api.tasks.path}:id`)
  .get(async (req, res) => {
    const id = req.params['id'];
    const repo = req.unitOfWork.taskRepository;
    const task = await repo.get(id);
    const dto = task.toResource();
    res.json(dto);
  })
  .put(async (req, res) => {
    const model = req.body as TaskResource;
    const task = await Task.createFrom(model, req.unitOfWork);
    const repo = req.unitOfWork.taskRepository;
    await repo.update(task);
    res.end();
  });