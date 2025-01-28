import { TaskRepository } from "../../repositories/TaskRepository";
import { DeleteTaskController } from "./DeleteTaskController";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

const taskRepository = TaskRepository.getInstance();
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);