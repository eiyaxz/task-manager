import express from "express";
import cookieParser from "cookie-parser";

import { initializeDatabase } from "./database";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(3333, async () => {
    await initializeDatabase();

    console.log("[SERVER] Running on port 3333!");
});