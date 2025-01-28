import { Request, Response } from "express";

import { IndexUserUseCase } from "./IndexUserUseCase";

export class IndexUserController {
    constructor(private indexUserUseCase: IndexUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username } = request.params;

        return await this.indexUserUseCase.execute(username)
            .then((user) => response.status(200).json({ success: true, user }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}