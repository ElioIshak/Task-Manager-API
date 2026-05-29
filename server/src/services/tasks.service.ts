import { db } from "../db/db";
import type { Priority, Status } from "../types";
import { generateTaskID } from "../utils/generators";

type TaskSortBy = "created_at" | "due_date";
type SortOrder = "asc" | "desc";

export type GetTasksOptions = {
    status?: Status;
    search?: string;
    sortBy?: TaskSortBy;
    sortOrder?: SortOrder;
};

export type UpdateTaskInput = {
    title?: string;
    description?: string | null;
    status?: Status;
    priority?: Priority;
    dueDate?: Date;
};

// create task function
export async function createTask(
    userId: string,
    title: string,
    description: string | null,
    status: Status,
    priority: Priority,
    dueDate: Date,
    createdAt: Date
) {
    if (!userId)
        throw Error ("Invalid User!")

    const taskCount = await db
        .selectFrom("Tasks")
        .select((eb) => eb.fn.countAll().as("count"))
        .executeTakeFirst();

    const taskId = generateTaskID(userId, Number(taskCount?.count ?? 0) + 1)
    const normalizedTitle = title.trim() || ("Task_" + taskId);

    const task = await db
        .insertInto("Tasks")
        .values({
            id: taskId,
            user_id: userId,
            title: normalizedTitle,
            description: description,
            status: status,
            priority: priority,
            due_date: dueDate,
            created_at: createdAt
        })
        .returningAll()
        .executeTakeFirstOrThrow();

    if (!task)
        throw Error ("Failed to create task!")

    return task;
};

// get user tasks function (with options)
export async function getTasksByUser(userId: string, options: GetTasksOptions = {}) {
    if (!userId)
        throw Error ("Invalid User!");

    const sortBy = options.sortBy ?? "created_at";
    const sortOrder = options.sortOrder ?? "desc";

    let query = db
        .selectFrom("Tasks")
        .selectAll()
        .where("user_id", "=", userId);

    if (options.status) {
        query = query.where("status", "=", options.status);
    }

    const search = options.search?.trim();

    if (search) {
        query = query.where("title", "ilike", `%${search}%`);
    }

    return query
        .orderBy(sortBy, sortOrder)
        .execute();
};

// get task by id function
export async function getTaskById(userId: string, taskId: string) {
    if (!userId)
        throw Error ("Invalid User!");

    if (!taskId)
        throw Error ("Invalid Task!");

    const task = await db
        .selectFrom("Tasks")
        .selectAll()
        .where("id", "=", taskId)
        .where("user_id", "=", userId)
        .executeTakeFirst();

    if (!task)
        throw Error ("Task not found!");

    return task;
};

// update task function
export async function updateTask(userId: string, taskId: string, updates: UpdateTaskInput) {
    if (!userId)
        throw Error ("Invalid User!");

    if (!taskId)
        throw Error ("Invalid Task!");

    const updateValues: {
        title?: string;
        description?: string | null;
        status?: Status;
        priority?: Priority;
        due_date?: Date;
    } = {};

    if (updates.title !== undefined) {
        const normalizedTitle = updates.title.trim();

        if (!normalizedTitle)
            throw Error ("Title cannot be empty!");

        updateValues.title = normalizedTitle;
    }

    if (updates.description !== undefined)
        updateValues.description = updates.description;

    if (updates.status !== undefined)
        updateValues.status = updates.status;

    if (updates.priority !== undefined)
        updateValues.priority = updates.priority;

    if (updates.dueDate !== undefined)
        updateValues.due_date = updates.dueDate;

    if (Object.keys(updateValues).length === 0)
        throw Error ("No task updates provided!");

    const task = await db
        .updateTable("Tasks")
        .set(updateValues)
        .where("id", "=", taskId)
        .where("user_id", "=", userId)
        .returningAll()
        .executeTakeFirst();

    if (!task)
        throw Error ("Task not found!");

    return task;
};

// delete task function
export async function deleteTask(userId: string, taskId: string) {
    if (!userId)
        throw Error ("Invalid User!");

    if (!taskId)
        throw Error ("Invalid Task!");

    const task = await db
        .deleteFrom("Tasks")
        .where("id", "=", taskId)
        .where("user_id", "=", userId)
        .returningAll()
        .executeTakeFirst();

    if (!task)
        throw Error ("Task not found!");

    return task;
};

// mark completed function
export async function markTaskAsCompleted(userId: string, taskId: string) {
    return updateTask(userId, taskId, { status: "COMPLETED" });
};
