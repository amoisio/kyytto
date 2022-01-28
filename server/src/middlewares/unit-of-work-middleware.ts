import express from 'express';
import { LowDbUnitOfWork } from '../storage/lowdb/unit-of-work.js';

export const router = express.Router();

router.use(async(req, res, next) => {
  const unitOfWork = await LowDbUnitOfWork.openContext();
  res.once('finish', async () => await unitOfWork.closeContext());
  req.unitOfWork = unitOfWork;
  next();
});
