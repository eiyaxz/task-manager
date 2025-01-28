import { Request, Response } from "express";

import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

export class UpdateTaskController {
    constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { description, complete } = request.body;
        const owner = request.user._id;

        return await this.updateTaskUseCase.execute({ _id: id, owner, description, complete })
            .then(() => response.status(200).json({ success: true }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}