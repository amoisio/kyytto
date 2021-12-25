import UnitOfWork from '../unit-of-work.js';

declare global {
  namespace Express {
    interface Request {
      unitOfWork: UnitOfWork;
    }
  }
}
