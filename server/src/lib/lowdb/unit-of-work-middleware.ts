import express from 'express';
import { builder } from './unit-of-work.js';

export const router = express.Router();

const fileName = process.env['LOWDB_FILENAME'];

router.use(async(req, res, next) => {
  req.unitOfWork = builder(fileName!);
  await req.unitOfWork.startSession();
  res.once('finish', async () => await req.unitOfWork.closeSession());
  next();
});
