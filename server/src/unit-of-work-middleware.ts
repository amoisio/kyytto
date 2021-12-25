import express from 'express';
import { LowDbUnitOfWork } from './storage/lowdb/unit-of-work.js';
// import { MySqlUnitOfWork } from './lib/mysql/unit-of-work.js';

export const router = express.Router();

router.use(async(req, res, next) => {
  const unitOfWork = LowDbUnitOfWork.create();
  await unitOfWork.startSession();
  res.once('finish', async () => await unitOfWork.closeSession());
  req.unitOfWork = unitOfWork;
  next();
});
