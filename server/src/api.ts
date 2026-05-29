import { Router } from "express";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import { setUserJWT } from "./middleware/auth.middleware";

const api = Router();

api.use("/auth", authRoutes);
api.use(setUserJWT);
api.use("/tasks", tasksRoutes);


export default api;
