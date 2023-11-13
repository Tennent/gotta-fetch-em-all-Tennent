export async function fetchLocation(index) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/location/${index}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching location: ${error}`);
    }
};

export async function fetchAreas(locationAreaName) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/location-area/${locationAreaName}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching areas: ${error}`);
    }
};

