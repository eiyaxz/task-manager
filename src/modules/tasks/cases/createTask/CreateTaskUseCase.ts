import { Task } from "../../models/Task";
import { TaskRepository } from "../../repositories/TaskRepository";
import { StatusError } from "../../../../utils/StatusError";

interface CreateTaskDTO {
    description: string;
    owner: string;
}

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute({ description, owner }: CreateTaskDTO): Promise<Task> {
        if (description.length < 3) {
            throw new StatusError("Description must have at least 3 characters", 400);
        }

        if (description.length > 255) {
            throw new StatusError("Description must have at most 255 characters", 400);
        }

        return await this.taskRepository.create({ description, owner });
    }
}