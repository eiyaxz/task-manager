import { TaskRepository } from "../../repositories/TaskRepository";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";
import { UpdateTaskController } from "./UpdateTaskController";

const taskRepository = TaskRepository.getInstance();
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
export const updateTaskController = new UpdateTaskController(updateTaskUseCase);