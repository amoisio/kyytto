import express from 'express';
import { Identifier, NewTag, TagResource, TagType } from 'kyytto-models';
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
    const name = (req.body as NewTag).name;
    const builder = req.tagBuilder;
    const tag = await builder.new(name);
    const repository = req.unitOfWork.tagRepository;
    await repository.add(tag);
    res.json(tag.id);  
  });

router.route(`${api.tags.path}/:id`)
  .get(async (req, res) => {
    const id = req.params['id'];
    const service = req.tagService;
    const tag = await service.getById(Identifier.build(id));
    const resource = tag.toResource();
    res.json(resource);
  })
  .put(async (req, res) => {
    const resource = req.body as TagResource;
    if (resource.type !== TagType.UserDefined) {
      res.sendStatus(400);
    } else {
      const builder = req.tagBuilder;
      const tag = await builder.from(resource);
      const repository = req.unitOfWork.tagRepository;
      await repository.update(tag);
      res.end();
    }
  })
  .delete(async (req, res) => {
    const id = req.params['id'];
    const repository = req.unitOfWork.tagRepository;
    await repository.delete(Identifier.build(id));
    res.end();
  });
