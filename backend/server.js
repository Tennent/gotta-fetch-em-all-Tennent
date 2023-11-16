import express from "express";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);

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

app.post("/api/pokemons", async (req, res) => {
    try {
        const data = await fs.readFile('./pokemons.json', 'utf-8')
        const pokemons = JSON.parse(data)
        const pokemon = req.body.url; //ne felejtsük el xd

        if (!pokemons.includes(pokemon)) {
            pokemons.push(pokemon);
            await fs.writeFile('./pokemons.json', JSON.stringify(pokemons), 'utf-8')
            return res.status(200).json({ message: 'Pokemon added to the list' })
        } else {
            return res.status(208).json({ message: 'Pokemon alraedy in list' })
        }
    } catch (error) {
        console.error('error reading file ' + error);
    }
});

app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000");
});
