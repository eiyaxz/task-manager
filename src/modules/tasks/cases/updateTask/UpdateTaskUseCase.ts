import { StatusError } from "../../../../utils/StatusError";
import { TaskRepository } from "../../repositories/TaskRepository";

interface UpdateTaskDTO {
    _id: string;
    owner: string;
    description: string;
    complete: boolean;
}

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({ _id, owner, description, complete }: UpdateTaskDTO): Promise<void> {
        const task = await this.taskRepository.findById(_id);

        if (!task) {
            throw new StatusError("Task not found", 404);
        }

        if (!description) {
            throw new StatusError("Description is required", 404);
        }

        if (description.length < 3) {
            throw new StatusError("Description must have at least 3 characters", 400);
        }

        if (description.length > 255) {
            throw new StatusError("Description must have at most 255 characters", 400);
        }

        if (task.owner !== owner) {
            throw new StatusError("Forbidden", 403);
        }

        await this.taskRepository.update({ _id, description, complete });
    }
}