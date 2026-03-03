import { Router } from "express";
import { setUserJWT } from "./middleware/auth";
import authRouter from "./routes/auth";
import tasksRouter from "./routes/tasks";
import usersRouter from "./routes/users";

const api = Router();

api.use('/api/auth', authRouter);

// user middleware for tasks and users endpoints only
api.use(setUserJWT);

api.use('/api/tasks', tasksRouter);
api.use('/api/users', usersRouter);

export default api;