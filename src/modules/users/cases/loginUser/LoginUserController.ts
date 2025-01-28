import { Request, Response } from "express";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
    constructor(private loginUserUseCase: LoginUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        return await this.loginUserUseCase.execute({ username, password })
            .then((user) => {
                response.cookie("token", user.access_token);

                return response.status(200).json({ success: true, user });
            })
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}