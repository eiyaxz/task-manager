import { compare, hash } from "bcrypt";

import { StatusError } from "../../../../utils/StatusError";
import { UserRepository } from "../../repositories/UserRepository";

interface UpdatePasswordDTO {
    _id: string;
    old_password: string;
    new_password: string;
}

export class UpdatePasswordUseCase {
    constructor(private userRepository: UserRepository) {}
    
    async execute({ _id, old_password, new_password }: UpdatePasswordDTO): Promise<void> {
        const user = await this.userRepository.findById(_id);
    
        if (!user) {
            throw new StatusError("Forbidden", 403); // not sure
        }

        if (new_password.length < 8) {
            throw new StatusError("New password must have at least 8 characters", 400);
        }
    
        const passwordMatch = await compare(old_password, user.password);
    
        if (!passwordMatch) {
            throw new StatusError("Invalid old password", 401); // also not sure
        }
    
        const hashed = await hash(new_password, 8);
    
        await this.userRepository.update({ _id, password: hashed });
    }
}