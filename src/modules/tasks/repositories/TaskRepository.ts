import { Repository } from "typeorm";

import { Task } from "../models/Task";
import { database } from "../../../database";
import { User } from "../../users/models/User";

interface CreateTaskDTO {
    description: string;
    owner: string;
}

interface UpdateTaskDTO {
    _id: string;
    description: string;
    complete: boolean;
}

export class TaskRepository {
    private tasks: Repository<Task>;
    private static INSTANCE: TaskRepository;

    private constructor() {
        this.tasks = database.getMongoRepository(Task);
    }

    static getInstance() {
        if (!TaskRepository.INSTANCE) {
            TaskRepository.INSTANCE = new TaskRepository();
        }

        return TaskRepository.INSTANCE;
    }

    async create({ description, owner }: CreateTaskDTO): Promise<Task> {
        const task = this.tasks.create({ description, owner });

        return await this.tasks.save(task);
    }

    async update({ _id, description, complete }: UpdateTaskDTO): Promise<void> {
        await this.tasks.update({ _id }, { description, complete });
    }

    async findById(_id: string): Promise<Task | null> { 
        return await this.tasks.findOne({ where: { _id } });
    }

    async findByOwner(owner: string): Promise<Task[]> {
        return await this.tasks.find({ where: { owner } });
    }

    async findTaskOwner(_id: string): Promise<User | null> {
        const task = await this.findById(_id);

        if (!task) {
            return null;
        }

        return await database.getMongoRepository(User).findOne({ where: { _id: task.owner } });
    }

    async delete(_id: string): Promise<void> {
        await this.tasks.delete({ _id });
    }
}