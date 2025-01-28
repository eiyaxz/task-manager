import { StatusError } from "../../../../utils/StatusError";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string): Promise<void> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new StatusError("User not found", 404);
        }

        await this.userRepository.delete(user._id);
    }
}