import express from 'express';
import { Identifier, TagDto, TagResource, TagType } from 'kyytto-models';
import { api } from '../api.js';

export const router = express.Router();

router.route(api.tags.path)
  .get(async (req, res) => {
    const service = req.tagService;
    const tags = await service.getAllSorted();
    const resources = tags.map(tag => tag.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const dto = req.body as TagDto;
    if (dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.tagBuilder;
    const tag = await builder.new(dto);
    const repository = req.unitOfWork.tagRepository;
    await repository.add(tag);

    res.json(tag.id);  
  });

router.route(`${api.tags.path}/:id`)
  .get(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    if (!Identifier.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const service = req.tagService;
    const tag = await service.getById(id);
    const resource = tag.toResource();

    res.json(resource);
  })
  .put(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    const dto = req.body as TagDto;
    if (!Identifier.isValid(id) || dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.tagBuilder;
    const tag = await builder.from(id, dto);
    const repository = req.unitOfWork.tagRepository;
    await repository.update(tag);

    res.end();
  })
  .delete(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    if (!Identifier.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const repository = req.unitOfWork.tagRepository;
    await repository.delete(id);

    res.end();
  });
