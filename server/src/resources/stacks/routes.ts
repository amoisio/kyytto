import express from 'express';
import { api, StackDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';

export const router = express.Router();

router.route(api.stacks.path)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const repository = req.unitOfWork.stackRepository;
    const stacks = await repository.getAll();
    const resources = stacks.map(stack => stack.toResource(baseUrl));
    res.json(resources);
  })
  .post(dtoParser)
  .post(async (req, res) => {
    const dto = req.bodyAs<StackDto>();
    const builder = req.stackBuilder;
    const stack = await builder.new(dto);
    const repository = req.unitOfWork.stackRepository;
    await repository.add(stack);
    res.json(stack.id);
  });

router.route(api.stacks.byId.path)
  .all(idParser)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const id = req.id;
    const repository = req.unitOfWork.stackRepository;
    const stack = await repository.getById(id);
    const resource = stack.toResource(baseUrl);
    res.json(resource);
  })
  .put(dtoParser)
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.bodyAs<StackDto>();
    const builder = req.stackBuilder;
    const stack = await builder.from(id, dto);
    const repository = req.unitOfWork.stackRepository;
    await repository.update(stack);
    res.end();
  })
  .delete(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.stackRepository;
    await repository.delete(id);
    res.end();
  });
