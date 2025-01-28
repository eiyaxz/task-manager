import { UserRepository } from "../../repositories/UserRepository";
import { ListAllUsersController } from "./ListAllUsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

const userRepository = UserRepository.getInstance();
const listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
export const listAllUsersController = new ListAllUsersController(listAllUsersUseCase);