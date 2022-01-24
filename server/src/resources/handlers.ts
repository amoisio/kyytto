import { RequestHandler } from 'express'
import { Identifier } from 'kyytto-models';

export const idValidation: RequestHandler = (req, res, next) => {
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