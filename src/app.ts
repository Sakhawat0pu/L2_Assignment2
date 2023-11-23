import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { usersRouter } from './app/module/user/user.route';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'A server for mongoose assignment',
  });
});

export default app;
