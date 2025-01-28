import { DataSource } from "typeorm";

import { User } from "../modules/users/models/User";
import { Task } from "../modules/tasks/models/Task";

import "dotenv/config";

export const database = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,
    database: process.env.MONGO_DATABASE,
    entities: [User, Task],
});

export async function initializeDatabase() {
    await database.initialize()
        .then(() => console.log("[SERVER] Database connected successfully!"))
        .catch((error) => console.error("[SERVER] Database connection error:", error));
}