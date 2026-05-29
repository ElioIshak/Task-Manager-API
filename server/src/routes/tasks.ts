import { Router } from "express";
import {
    createOrganizationTaskController,
    createTaskController,
    deleteTaskController,
    getAvailableOrganizationTasksController,
    getOrganizationTasksController,
    getMyTasksController,
    getTaskByIdController,
    markTaskCompletedController,
    takeOrganizationTaskController,
    updateTaskController
} from "../controllers/tasks.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, createTaskController);
router.get("/", requireAuth, getMyTasksController);

router.post("/organization", requireAuth, createOrganizationTaskController);
router.get("/organization", requireAuth, getOrganizationTasksController);
router.get("/organization/available", requireAuth, getAvailableOrganizationTasksController);
router.patch("/organization/:id/take", requireAuth, takeOrganizationTaskController);

router.get("/:id", requireAuth, getTaskByIdController);
router.patch("/:id", requireAuth, updateTaskController);
router.patch("/:id/complete", requireAuth, markTaskCompletedController);
router.delete("/:id", requireAuth, deleteTaskController);

export default router;
