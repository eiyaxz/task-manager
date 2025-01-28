import { TaskRepository } from "../../repositories/TaskRepository";
import { IndexTasksController } from "./IndexTasksController";
import { IndexTasksUseCase } from "./IndexTasksUseCase";

const taskRepository = TaskRepository.getInstance();
const indexTasksUseCase = new IndexTasksUseCase(taskRepository);
export const indexTasksController = new IndexTasksController(indexTasksUseCase);