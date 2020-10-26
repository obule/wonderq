import { NextFunction, Request, Response } from 'express';
import decodeJWT from 'jwt-decode';
import { NotAuthorizedError } from '../errors/not-authorized-error';

interface UserPayload {
  email: string;
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization!;
  if (!token) {
    // return next();
    throw new NotAuthorizedError();
  }
  token = token.split(' ').pop() as string;

  try {
    const payload = decodeJWT(token) as UserPayload;
    if (payload.role !== 'admin') throw new NotAuthorizedError();
    req.currentUser = payload;
    return next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
