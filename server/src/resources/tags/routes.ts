import express from 'express';
import { api, TagDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';

export const router = express.Router();

router.route(api.tags.path)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const service = req.tagService;
    const tags = await service.getAllSorted();
    const resources = tags.map(tag => tag.toResource(baseUrl));
    res.json(resources);
  })
  .post(dtoParser)
  .post(async (req, res) => {
    const dto = req.bodyAs<TagDto>();
    const builder = req.tagBuilder;
    const tag = await builder.new(dto);
    const repository = req.unitOfWork.tagRepository;
    await repository.add(tag);
    res.json(tag.id);  
  });

router.route(api.tags.byId.path)
  .all(idParser)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const id = req.id;
    const service = req.tagService;
    const tag = await service.getById(id);
    const resource = tag.toResource(baseUrl);
    res.json(resource);
  })
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.bodyAs<TagDto>();
    const builder = req.tagBuilder;
    const tag = await builder.from(id, dto);
    const repository = req.unitOfWork.tagRepository;
    await repository.update(tag);
    res.end();
  })
  .delete(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.tagRepository;
    await repository.delete(id);
    res.end();
  });
