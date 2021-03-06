import express from 'express';
import { api, ProjectDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';

export const router = express.Router();

router.route(api.projects.path)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const repository = req.unitOfWork.projectRepository;
    const projects = await repository.getAll();
    const resources = projects.map(project => project.toResource(baseUrl));
    res.json(resources);
  })
  .post(dtoParser)
  .post(async (req, res) => {
    const dto = req.bodyAs<ProjectDto>();
    const builder = req.projectBuilder;
    const project = await builder.new(dto);
    const repository = req.unitOfWork.projectRepository;
    await repository.add(project);
    res.json(project.id);
  });

router.route(api.projects.byId.path)
  .all(idParser)
  .get(async (req, res) => {
    const id = req.id;
    const baseUrl = req.baseUrl;
    const repository = req.unitOfWork.projectRepository;
    const project = await repository.getById(id);
    const resource = project.toResource(baseUrl);
    res.json(resource);
  })
  .put(dtoParser)
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.bodyAs<ProjectDto>();
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
