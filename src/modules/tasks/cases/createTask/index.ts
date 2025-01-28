import { TaskRepository } from "../../repositories/TaskRepository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

const taskRepository = TaskRepository.getInstance();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
export const createTaskController = new CreateTaskController(createTaskUseCase);