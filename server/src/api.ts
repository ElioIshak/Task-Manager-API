import { Router } from "express";
import authRoutes from "./routes/auth";

const api = Router();

api.use("/auth", authRoutes);


export default api;
