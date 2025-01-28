import { Router } from "express";

import { createTaskController } from "../modules/tasks/cases/createTask";
import { indexTasksController } from "../modules/tasks/cases/indexTasks";
import { updateTaskController } from "../modules/tasks/cases/updateTask";
import { deleteTaskController } from "../modules/tasks/cases/deleteTask";

import { authentication } from "../auth";

export const tasks = Router();

tasks.post("/create", authentication, async (request, response) => {
    await createTaskController.handle(request, response);
});

tasks.get("/index", authentication, async (request, response) => {
    await indexTasksController.handle(request, response);
});

tasks.put("/update/:id", authentication, async (request, response) => {
    await updateTaskController.handle(request, response);
});

tasks.delete("/delete/:id", authentication, async (request, response) => {
    await deleteTaskController.handle(request, response);
});