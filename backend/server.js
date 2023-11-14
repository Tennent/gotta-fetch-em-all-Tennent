import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get("/api/pokemons", async (req, res) => {
    try {
        const data = await fs.readFile('./pokemons.json', 'utf-8')
        const pokemons = JSON.parse(data)
        res.json({ pokemons })
    } catch (error) {
        console.error('error reading file ' + error);
    }

});

app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000");
});
