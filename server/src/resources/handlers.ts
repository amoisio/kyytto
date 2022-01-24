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