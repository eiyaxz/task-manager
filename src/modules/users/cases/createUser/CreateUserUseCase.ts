import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
import { StatusError } from "../../../../utils/StatusError";

interface CreateUserDTO {
    username: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: CreateUserDTO): Promise<User> {
        if (username.length < 3) {
            throw new StatusError("Username must have at least 3 characters", 400);
        }

        if (username.length > 16) {
            throw new StatusError("Username must have at most 16 characters", 400);
        }

        const user = await this.userRepository.findByUsername(username);

        if (user) {
            throw new StatusError("Username already exists", 400);
        }

        if (password.length < 8) {
            throw new StatusError("Password must have at least 8 characters", 400);
        }

        return await this.userRepository.create({ username, password });
    }
}