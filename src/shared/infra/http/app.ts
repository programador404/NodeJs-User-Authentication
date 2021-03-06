import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { AppError } from '@shared/error/AppError';
import { Routes } from './routes/index.routes';

import '@shared/container/index'; // Dependency injection container
import '@shared/infra/database/typeorm/index'; // Postgres database connection

const App = express();

App.use(cors());
App.use(express.json());
App.use(Routes);
App.use(errors());

App.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.code).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.log(err); // Temporary

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

export { App };
