import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        return await this.createUserUseCase.execute({ username, password })
            .then(user => {
                response.cookie("token", user.access_token);

                return response.status(201).json({ success: true, user });
            })
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}