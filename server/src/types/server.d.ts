import { Api } from 'kyytto-models';
import IUnitOfWork from '../lib/iUnitOfWork';

declare global {
  namespace Express {
    interface Request {
      api: Api;
      unitOfWork: IUnitOfWork;
    }
  }
}
