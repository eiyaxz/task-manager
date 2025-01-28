import { Request, Response } from "express";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username } = request.params;

        if (username === request.user.username) {
            return response.status(400).json({ success: false, reason: "Are you dumb?" });
        }

        return await this.deleteUserUseCase.execute(username)
            .then(() => response.status(200).json({ success: true }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}