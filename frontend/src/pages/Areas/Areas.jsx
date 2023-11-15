import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAreas } from '../../services/FetchLocations'
import { fetchPokemon, fetchOwnedPokemons } from '../../services/FetchPokemons'
import { useEffect, useState } from 'react'
import random from '../../utils/random'
import Pokemon from '../../components/Pokemon'
import BattleButton from '../../components/BattleButton'
import './Areas.css'


export default function Areas() {
    const navigate = useNavigate()
    const { name } = useParams()

    const [encounter, setEncounter] = useState([]);
    const [enemyPokemon, setEnemyPokemon] = useState(null);
    const [ownedPokemons, setOwnedPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    useEffect(() => {
        const fetchArea = async () => {
            const area = await fetchAreas(name);
            if (area.pokemon_encounters.length > 0) setEncounter(area.pokemon_encounters);
            const pokemonUrl = area.pokemon_encounters[random(area.pokemon_encounters.length)].pokemon.url
            setEnemyPokemon(await fetchPokemon(pokemonUrl))

            const pokemonUrls = await fetchOwnedPokemons()
            const pokemonArray = pokemonUrls.pokemons.map(pokemonUrl => fetchPokemon(pokemonUrl))
            setOwnedPokemons(await Promise.all(pokemonArray))
        }
        fetchArea()
    }, [])
    console.log(ownedPokemons);
    console.log(selectedPokemon);
    if (encounter) {
        return (
            <div className='encounter'>
                {(enemyPokemon) ?
                    <Pokemon pokemon={enemyPokemon} /> :
                    <p>loading...</p>}
                {selectedPokemon ?
                    <>
                        <Pokemon pokemon={selectedPokemon} />
                        <BattleButton selectedPokemon={selectedPokemon} enemyPokemon={enemyPokemon} />
                    </>
                    : (ownedPokemons.length > 0) ?
                        <div className='own-pokemons'>
                            <h2>Own pokemons</h2>
                            <h3>Please choose a Pokemon</h3>
                            {ownedPokemons.map((pokemon, i) =>
                                <Pokemon key={i} pokemon={pokemon} setSelectedPokemon={() => setSelectedPokemon(pokemon)} />
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


