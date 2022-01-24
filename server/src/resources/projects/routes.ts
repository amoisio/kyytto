import express from 'express';
import { ProjectDto } from 'kyytto-models';
import { api } from '../api.js';
import { idValidation } from '../handlers.js';

export const router = express.Router();

router.route(api.projects.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.projectRepository;
    const projects = await repository.getAll();
    const resources = projects.map(project => project.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const dto = req.body as ProjectDto;
    if (dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.projectBuilder;
    const project = await builder.new(dto);
    const repository = req.unitOfWork.projectRepository;
    await repository.add(project);

    res.json(project.id);
  });

router.route(`${api.projects.path}/:id`)
  .all(idValidation)
  .get(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.projectRepository;
    const project = await repository.getById(id);
    const resource = project.toResource();
    res.json(resource);
  })
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.body as ProjectDto;
    if (dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.projectBuilder;
    const project = await builder.from(id, dto);
    const repository = req.unitOfWork.projectRepository;
    await repository.update(project);
    res.end();
  })
  .delete(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.projectRepository;
    await repository.delete(id);
    res.end();
  });
