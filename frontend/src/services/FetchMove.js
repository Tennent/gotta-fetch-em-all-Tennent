export default async function fetchMove(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching move: ${error}`);
    }
}
