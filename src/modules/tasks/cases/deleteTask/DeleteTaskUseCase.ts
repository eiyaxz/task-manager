import { TaskRepository } from "../../repositories/TaskRepository";
import { StatusError } from "../../../../utils/StatusError";

interface DeleteTaskDTO {
    _id: string;
    owner: string;
}

export class DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({ _id, owner }: DeleteTaskDTO): Promise<void> {
        const task = await this.taskRepository.findById(_id);

        if (!task) {
            throw new StatusError("Task not found", 404);
        }

        if (task.owner !== owner) {
            throw new StatusError("Forbidden", 403);
        }

        await this.taskRepository.delete(_id);
    }
}