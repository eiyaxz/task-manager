import { Router } from "express";

import { createUserController } from "../modules/users/cases/createUser";
import { loginUserController } from "../modules/users/cases/loginUser";
import { listAllUsersController } from "../modules/users/cases/listAllUsers";
import { indexUserController } from "../modules/users/cases/indexUser";
import { updatePasswordController } from "../modules/users/cases/updatePassword";
import { deleteUserController } from "../modules/users/cases/deleteUser";

import { adminOnly, authentication } from "../auth";

export const users = Router();

users.post("/register", async (request, response) => {
    await createUserController.handle(request, response);
});

users.post("/login", async (request, response) => {
    await loginUserController.handle(request, response);
});

users.get("/index", authentication, adminOnly, async (_, response) => {
    await listAllUsersController.handle(response);
});

users.get("/index/:username", authentication, adminOnly, async (request, response) => {
    await indexUserController.handle(request, response);
});

users.put("/update", authentication, async (request, response) => {
    await updatePasswordController.handle(request, response);
});

users.delete("/delete/:username", authentication, adminOnly, async (request, response) => {
    await deleteUserController.handle(request, response);
});