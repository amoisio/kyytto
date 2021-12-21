import express from 'express';
import { Project } from './project';
import { ProjectResource } from 'kyytto-models';
import { api } from '../../api';

export const router = express.Router();

router.route(api.projects.path)
  .get(async (req, res) => {
    const repo = req.unitOfWork.projectRepository;
    const projects = await repo.getAll();
    const dtos = projects.map(project => project.toResource());
    res.json(dtos);
  })
  .post(async (req, res) => {
    const model = req.body as ProjectResource;
    const project = Project.createFrom(model);
    const repo = req.unitOfWork.projectRepository;
    const id = await repo.create(project);
    res.redirect(`${api.projects.path}/${id}`);
  });

router.route(`${api.projects.path}:id`)
  .get(async (req, res) => {
    const id = req.params['id'];
    const repo = req.unitOfWork.projectRepository;
    const project = await repo.get(id);
    const dto = project.toResource();
    res.json(dto);
  })
  .put(async (req, res) => {
    const model = req.body as ProjectResource;
    const project = Project.createFrom(model);
    const repo = req.unitOfWork.projectRepository;
    await repo.update(project);
    res.end();
  });