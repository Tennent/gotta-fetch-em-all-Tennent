import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.send({ message: "Hello from the backend!"})
});

app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000");
});
