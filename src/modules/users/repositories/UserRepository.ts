import { MongoRepository } from "typeorm";
import { hash } from "bcrypt";

import { User } from "../models/User";
import { database } from "../../../database";

interface CreateUserDTO {
    username: string;
    password: string;
}

interface UpdatePasswordDTO {
    _id: string;
    password: string;
}

export class UserRepository {
    private users: MongoRepository<User>;
    private static INSTANCE: UserRepository;

    private constructor() {
        this.users = database.getMongoRepository(User);
    }

    static getInstance() {
        if (!UserRepository.INSTANCE) {
            UserRepository.INSTANCE = new UserRepository();
        }

        return UserRepository.INSTANCE;
    }

    async create({ username, password }: CreateUserDTO): Promise<User> {
        const hashed = await hash(password, 8);
        const user = this.users.create({ username, password: hashed });

        return await this.users.save(user);
    }

    async index(): Promise<User[]> {
        return await this.users.find();
    }

    async findById(_id: string): Promise<User | null> {
        return await this.users.findOne({ where: { _id } });
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.users.findOne({ where: { username } });
    }
    
    async update({ _id, password }: UpdatePasswordDTO): Promise<void> {
        await this.users.update({ _id }, { password });
    }

    async delete(_id: string): Promise<void> {
        await this.users.delete({ _id });
    }
}