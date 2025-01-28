import { UserRepository } from "../../repositories/UserRepository";
import { UpdatePasswordController } from "./UpdatePasswordController";
import { UpdatePasswordUseCase } from "./UpdatePasswordUseCase";

const userRepository = UserRepository.getInstance();
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository);
export const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);