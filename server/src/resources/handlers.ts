import { RequestHandler } from 'express'
import { Identifier } from 'k-models';
import { options } from '../options.js';

export const idParser: RequestHandler = (req, res, next) => {
  const id = Identifier.build(req.params['id']);
  if (Identifier.isValid(id)) {
    req.id = id;
    next();
  } else {
    res.sendStatus(400);
  }
}

export const dtoParser: RequestHandler = (req, res, next) => {
  const dto = req.body;
  if (dto !== undefined) {
    req.bodyAs = <TDto>() => dto as TDto;
    next();
  } else {
    res.sendStatus(400);
  }
};

export const baseUrlParser: RequestHandler = (req, res, next) => {
  const base = `${req.protocol}://${req.hostname}`
  req.baseUrl = (options.apiServerPort !== 80)
    ? `${base}:${options.apiServerPort}`
    : base;
  next();
}