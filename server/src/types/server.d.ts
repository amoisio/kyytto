import UnitOfWork from '../lib/unitOfWork.js';

declare global {
  namespace Express {
    interface Request {
      unitOfWork: UnitOfWork;
    }
  }
}
