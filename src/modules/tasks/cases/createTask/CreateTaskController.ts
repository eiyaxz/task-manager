import { Request, Response } from "express";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

export class CreateTaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { description } = request.body;
        const owner = request.user._id;

        return await this.createTaskUseCase.execute({ description, owner })
            .then(task => response.status(201).json({ success: true, task }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}