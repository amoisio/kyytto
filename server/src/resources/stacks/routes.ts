import express from 'express';
import { Identifier, StackDto } from 'kyytto-models';
import { api } from '../api.js';

export const router = express.Router();

router.route(api.stacks.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.stackRepository;
    const stacks = await repository.getAll();
    const resources = stacks.map(stack => stack.toResource());

    res.json(resources);
  })
  .post(async (req, res) => {
    const dto = req.body as StackDto;
    if (dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.stackBuilder;
    const stack = await builder.new(dto);
    const repository = req.unitOfWork.stackRepository;
    await repository.add(stack);

    res.json(stack.id);
  });

router.route(`${api.stacks.path}/:id`)
  .get(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    if (!Identifier.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const repository = req.unitOfWork.stackRepository;
    const stack = await repository.getById(id);
    const resource = stack.toResource();

    res.json(resource);
  })
  .put(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    const dto = req.body as StackDto;
    if (!Identifier.isValid(id) || dto === undefined) {
      res.sendStatus(400);
      return;
    }
    const builder = req.stackBuilder;
    const stack = await builder.from(id, dto);
    const repository = req.unitOfWork.stackRepository;
    await repository.update(stack);

    res.end();
  })
  .delete(async (req, res) => {
    const id = Identifier.build(req.params['id']);
    if (!Identifier.isValid(id)) {
      res.sendStatus(400);
      return;
    }
    const repository = req.unitOfWork.stackRepository;
    await repository.delete(id);

    res.end();
  });
