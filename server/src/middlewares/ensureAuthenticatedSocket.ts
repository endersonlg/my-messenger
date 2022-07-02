import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

interface IAuth {
  token?: string;
}

interface IPayload {
  sub: string;
}

export function ensureAuthenticatedSocket(
  socket: Socket,
  next?: (err?: ExtendedError) => void,
): void {
  const { token } = socket.handshake.auth as IAuth;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  try {
    const { sub } = verify(
      token,
      process.env.APPLICATION_JWT_SECRET,
    ) as IPayload;

    // eslint-disable-next-line no-param-reassign
    socket.user_id = sub;

    return next();
  } catch {
    return next(new Error('Authentication error'));
  }
}
