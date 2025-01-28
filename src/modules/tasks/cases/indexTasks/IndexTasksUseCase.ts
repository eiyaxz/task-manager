import { TaskRepository } from "../../repositories/TaskRepository";
import { Task } from "../../models/Task";

export class IndexTasksUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(owner: string): Promise<Task[]> {
        return await this.taskRepository.findByOwner(owner);
    }
}