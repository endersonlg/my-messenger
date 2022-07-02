import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ListUserById } from '../services/ListUserByIdService';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedRest(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authToken = request.headers.authorization;
  const listUserById = new ListUserById();

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      process.env.APPLICATION_JWT_SECRET,
    ) as IPayload;

    const user = await listUserById.execute(sub);

    if (!user) {
      throw new Error('User not found');
    }

    request.user_id = sub;

    return next();
  } catch {
    return response.status(401).end();
  }
}
