import express from 'express';
import { builder } from './unit-of-work.js';

export const router = express.Router();

const fileName = process.env['LOWDB_FILENAME'];

router.use(async(req, res, next) => {
  const unitOfWork = builder(fileName!);
  await unitOfWork.startSession();
  res.once('finish', async () => await unitOfWork.closeSession());
  req.unitOfWork = unitOfWork;
  next();
});
