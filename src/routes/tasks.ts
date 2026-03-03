import { Router } from 'express';
import { generateTaskID } from '../utils/generators';
import { requireAuth } from '../middleware/auth';


const router = Router();

// create task endpoint
// POST /api/tasks/create
router.post('/create', requireAuth, (req, res) => {

    const ownerID = req.userJWT?.sub || "";
    const title = req.body.title ?? "Untitled Task";

    // get number of tasks from user table
    const orderNum = 1;

    const taskID = generateTaskID(ownerID, orderNum);

    const task = {
        id: taskID,
        title: title,
        ownerID: ownerID,
        createdAT: new Date().toISOString()
    }
    
    return res.status(201).json({message: `created task of ID ${task.id}`})
});

export default router;