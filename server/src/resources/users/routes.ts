import express from 'express';
import { api, UserDto } from 'k-models';
import { dtoParser, idParser } from '../handlers.js';

export const router = express.Router();

router.route(api.users.path)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const repository = req.unitOfWork.userRepository;
    const users = await repository.getAll();
    const resources = users.map(user => user.toResource(baseUrl));
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

router.route(api.users.byId.path)
  .all(idParser)
  .get(async (req, res) => {
    const baseUrl = req.baseUrl;
    const id = req.id;
    const repository = req.unitOfWork.userRepository;
    const user = await repository.getById(id);
    const resource = user.toResource(baseUrl);
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
