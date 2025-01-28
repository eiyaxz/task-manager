import { Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export class ListAllUsersController {
    constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

    async handle(response: Response): Promise<Response> {
        return await this.listAllUsersUseCase.execute()
            .then((users) => {
                const mapped = users.map(({ _id, username, role, created_at, access_token }) => {
                    return { _id, username, role, created_at, access_token };
                });

                return response.status(200).json({ success: true, users: mapped });
            })
            .catch(({ message, status }) => response.status(status || 500).json({ success: false, reason: message }));
    }
}