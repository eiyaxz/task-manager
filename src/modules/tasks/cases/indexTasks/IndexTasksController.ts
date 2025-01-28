import { Request, Response } from "express";

import { IndexTasksUseCase } from "./IndexTasksUseCase";

export class IndexTasksController {
    constructor(private indexTasksUseCase: IndexTasksUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { _id } = request.user;

        return await this.indexTasksUseCase.execute(_id)
            .then(tasks => response.status(200).json({ success: true, tasks }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}