import { Request, Response } from "express";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

export class DeleteTaskController {
    constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const _id = request.params.id;
        const owner = request.user._id;

        return await this.deleteTaskUseCase.execute({ _id, owner })
            .then(() => response.status(200).json({ success: true }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}