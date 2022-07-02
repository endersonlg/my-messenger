import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { router } from './routes';

import './database';

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(router);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

const serverHttp = createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

export { serverHttp, io };
