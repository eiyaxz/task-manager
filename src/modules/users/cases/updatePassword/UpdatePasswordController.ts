import { Request, Response } from "express";

import { UpdatePasswordUseCase } from "./UpdatePasswordUseCase";

export class UpdatePasswordController {
    constructor(private updatePasswordUseCase: UpdatePasswordUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { old_password, new_password } = request.body;
        const { _id } = request.user;

        return await this.updatePasswordUseCase.execute({ _id, old_password, new_password })
            .then(() => response.status(200).json({ success: true }))
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}