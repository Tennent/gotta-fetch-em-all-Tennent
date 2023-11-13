export default async function fetchLocation(index) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/location/${index}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching location: ${error}`);
    }
};