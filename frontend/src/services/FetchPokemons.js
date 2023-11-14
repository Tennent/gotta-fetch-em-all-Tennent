export async function fetchPokemon(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching pokemon: ${error}`);
    }
};

export async function fetchOwnedPokemons() {
    try {
        const res = await fetch("/api/pokemons");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching pokemon: ${error}`);
    }
};