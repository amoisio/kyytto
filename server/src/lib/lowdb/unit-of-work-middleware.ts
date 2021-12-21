import express from 'express';
import { builder } from './unit-of-work';

export const router = express.Router();

const filePath = process.env['LOWDB_PATH'];

router.use(async(req, res, next) => {
  req.unitOfWork = builder(filePath!);
  await req.unitOfWork.startSession();
  res.once('finish', async () => await req.unitOfWork.closeSession());
  next();
});
