import express from 'express';
import { UserDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';
import { api } from '../api.js';

export const router = express.Router();

router.route(api.users.path)
  .get(async (req, res) => {
    const repository = req.unitOfWork.userRepository;
    const users = await repository.getAll();
    const resources = users.map(user => user.toResource());
    res.json(resources);
  })
  .post(dtoParser)
  .post(async (req, res) => {
    const dto = req.bodyAs<UserDto>();
    const builder = req.userBuilder;
    const user = await builder.new(dto);
    const repository = req.unitOfWork.userRepository;
    await repository.add(user);
    res.json(user.id);  
  });

router.route(`${api.users.path}/:id`)
  .all(idParser)
  .get(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.userRepository;
    const user = await repository.getById(id);
    const resource = user.toResource();
    res.json(resource);
  })
  .put(dtoParser)
  .put(async (req, res) => {
    const id = req.id;
    const dto = req.bodyAs<UserDto>();
    const builder = req.userBuilder;
    const user = await builder.from(id, dto);
    const repository = req.unitOfWork.userRepository;
    await repository.update(user);
    res.end();
  })
  .delete(async (req, res) => {
    const id = req.id;
    const repository = req.unitOfWork.userRepository;
    await repository.delete(id);
    res.end();
  });
