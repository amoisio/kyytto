import express from 'express';
import { idBuilder, ProjectResource } from 'kyytto-models';
import { api } from '../api.js';

export const router = express.Router();

router.route(api.projects.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.projectRepository;
    const projects = await repository.getAll();
    const resources = projects.map(project => project.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const resource = req.body as ProjectResource;
    const builder = req.projectBuilder;
    const project = await builder.new(
      resource.name, 
      resource.description);
      
    const repository = req.unitOfWork.projectRepository;
    await repository.add(project);

    res.json(project.id);
  });

router.route(`${api.projects.path}/:id`)
  .get(async (req, res) => {
    const id = req.params['id'];
    const repository = req.unitOfWork.projectRepository;
    const project = await repository.getById(idBuilder(id));
    const resource = project.toResource();

    res.json(resource);
  })
  .put(async (req, res) => {
    const resource = req.body as ProjectResource;
    const builder = req.projectBuilder;
    const project = await builder.from(resource);

    const repository = req.unitOfWork.projectRepository;
    await repository.update(project);

    res.end();
  })
  .delete(async (req, res) => {
    const id = req.params['id'];
    const repository = req.unitOfWork.projectRepository;
    await repository.delete(idBuilder(id));

    res.end();
  });

router.route(`${api.projects.path}/migration`)
  .post(async (req, res) => {
    const resource = req.body as ProjectResource;
    const builder = req.projectBuilder;
    const project = await builder.from(resource);

    const repository = req.unitOfWork.projectRepository;
    await repository.add(project);

    res.end();
  });