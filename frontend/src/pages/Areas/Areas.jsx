import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAreas } from '../../services/FetchLocations'
import { fetchPokemon } from '../../services/FetchPokemons'
import { useEffect, useState } from 'react'
import random from '../../utils/random'
import './Areas.css'


export default function Areas() {
    const navigate = useNavigate()
    const { name } = useParams()
    const [encounter, setEncounter] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    useEffect(() => {
        const fetchArea = async () => {
            const area = await fetchAreas(name);
            if (area.pokemon_encounters.length > 0) setEncounter(area.pokemon_encounters);
            const pokemonUrl = area.pokemon_encounters[random(area.pokemon_encounters.length)].pokemon.url
            setPokemon(await fetchPokemon(pokemonUrl))
        }
        fetchArea()

    }, [])

    return (
        <div className='encounter'>
            {(encounter) ? (
                (pokemon) ?
                    <div className='pokemon'>
                        <h2>{pokemon.name}</h2>
                        <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
                    </div> :
                    <p>loading...</p>) :
                <p>This location doesn't seem to have any pokémon</p>}
            <button type='button' onClick={() => { navigate(-1) }}>Flee</button>
        </div>
    )
}


