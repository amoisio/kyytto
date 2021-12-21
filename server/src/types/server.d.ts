import UnitOfWork from '../lib/unitOfWork';

declare global {
  namespace Express {
    interface Request {
      unitOfWork: UnitOfWork;
    }
  }
}
