import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import { UserRepository } from "./modules/users/repositories/UserRepository";

interface UserDTO {
    _id: string;
    username: string;
}

export function generateToken({ _id: _id, username }: UserDTO) {
    return sign({ _id, username }, process.env.TOKEN_SECRET as string);
}

export function authentication(request: Request, response: Response, next: NextFunction): any {
    const header = request.headers.authorization;
    let token = header && header.split(' ')[1];

    if (!token) {
        return response.status(401).json({ success: false, reason: "Unauthorized" });
    }

    verify(token, process.env.TOKEN_SECRET as string, async (error, user: UserDTO) => {
        if (error) {
            return response.status(403).json({ success: false, reason: "Forbidden" });
        }

        const instance = await UserRepository.getInstance().findById(user._id);
        if (!instance) {
            return response.status(401).json({ success: false, reason: "Unauthorized" });
        }

        request.user = instance;

        next();
    });
}

export function adminOnly(request: Request, response: Response, next: NextFunction): any {
    if (request.user?.role !== "admin") {
        return response.status(401).json({ success: false, reason: "Insufficient permissions" });
    }

    next();
}