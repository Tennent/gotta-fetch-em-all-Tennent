import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAreas } from '../../services/FetchLocations'
import { fetchPokemon, fetchOwnedPokemons } from '../../services/FetchPokemons'
import { useEffect, useState } from 'react'
import random from '../../utils/random'
import './Areas.css'


export default function Areas() {
    const navigate = useNavigate()
    const { name } = useParams()

    const [encounter, setEncounter] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [ownedPokemons, setOwnedPokemons] = useState([]);
    useEffect(() => {
        const fetchArea = async () => {
            const area = await fetchAreas(name);
            if (area.pokemon_encounters.length > 0) setEncounter(area.pokemon_encounters);
            const pokemonUrl = area.pokemon_encounters[random(area.pokemon_encounters.length)].pokemon.url
            setPokemon(await fetchPokemon(pokemonUrl))

            const pokemonUrls = await fetchOwnedPokemons()
            const pokemonArray = pokemonUrls.pokemons.map(pokemonUrl => fetchPokemon(pokemonUrl))
            setOwnedPokemons(await Promise.all(pokemonArray))
        }
        fetchArea()
    }, [])
    console.log(ownedPokemons);
    if (encounter) {
        return (
            <div className='encounter'>
                {(pokemon) ?
                    <div className='pokemon'>
                        <h2>{pokemon.name}</h2>
                        <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
                    </div> :
                    <p>loading...</p>}
                {(ownedPokemons.length > 0) ?
                    <div className='own-pokemons'>
                        <h2>Own pokemons</h2>
                        {ownedPokemons.map((pokemon, i) =>
                            <div className='own-pokemon' key={i}>
                                <h2>{pokemon.name}</h2>
                                <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
                            </div>
                        )}
                    </div> :
                    <p>loading...</p>}
            </div>
        )
    } else {
        return (
            <p>No encounter</p>
        )
    }

}


