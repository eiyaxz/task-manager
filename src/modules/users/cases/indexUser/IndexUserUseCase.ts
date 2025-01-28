import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";
import { StatusError } from "../../../../utils/StatusError";

export class IndexUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string): Promise<User | null> {
        return await this.userRepository.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new StatusError("User not found", 404);
                }

                return user;
            });
    }
}