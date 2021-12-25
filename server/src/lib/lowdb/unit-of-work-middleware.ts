import express from 'express';
import { builder } from './unit-of-work.js';
import { options } from './options.js';

export const router = express.Router();

router.use(async(req, res, next) => {
  const unitOfWork = builder(options.fileName);
  await unitOfWork.startSession();
  res.once('finish', async () => await unitOfWork.closeSession());
  req.unitOfWork = unitOfWork;
  next();
});
