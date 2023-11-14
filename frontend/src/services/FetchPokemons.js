export async function fetchPokemon(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching pokemon: ${error}`);
    }
};