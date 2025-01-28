import { compare } from "bcrypt";

import { UserRepository } from "../../repositories/UserRepository";
import { StatusError } from "../../../../utils/StatusError";
import { User } from "../../models/User";

interface LoginUserDTO {
    username: string;
    password: string;
}

export class LoginUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: LoginUserDTO): Promise<User> {
        if (!username || !password) {
            throw new StatusError("Invalid credentials", 400);
        }

        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new StatusError("Invalid credentials", 400);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new StatusError("Invalid credentials", 400);
        }

        return user;
    }
}