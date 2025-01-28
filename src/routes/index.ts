import { Router } from "express";

import { users } from "./user.routes";
import { tasks } from "./task.routes";

export const routes = Router();

routes.use("/users", users);
routes.use("/tasks", tasks);