import { Router } from 'express';
import { generateTaskID } from '../utils/generators';
import { requireAuth } from '../middleware/auth';
import { db } from '../db/db';
import { Generated } from 'kysely';


const router = Router();

// create task endpoint
// POST /api/tasks/create
router.post('/create', requireAuth, async (req, res) => {

    const ownerID = String(req.userJWT?.sub);
    const title = req.body.title;

    if(!title)
        return res.status(400).json({error: "Missing Title..."})

    // get number of tasks from user table
    const orderNum = 1;

    const taskID = generateTaskID(String(ownerID), orderNum);

    
    const task = await db
        .insertInto("Tasks").values({
            id: taskID,
            title,
            description: null,
            status: "TODO",
            user_id: ownerID
        }).returningAll().execute();
    
    return res.status(201).json({message: `created task of ID ${taskID}`})
});

export default router;