import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAreas } from '../../services/FetchLocations'
import { fetchPokemon, fetchOwnedPokemons } from '../../services/FetchPokemons'
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

    if (encounter) {
        return (
            <div className='encounter container'>

                {(selectedPokemon && enemyPokemon) ?
                    <>
                        <div className='row d-flex justify-content-center'>
                            <Pokemon pokemon={enemyPokemon} className={"enemy-pokemon col-12 mb-5"} />
                            <h3>vs</h3>
                            <Pokemon pokemon={selectedPokemon} className={"own-pokemon col-12"} />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <BattleButton selectedPokemon={selectedPokemon} enemyPokemon={enemyPokemon} />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <button className='btn col-6 m-2' onClick={() => navigate("/")}>Flee</button>
                        </div>

                    </>
                    : (ownedPokemons.length > 0) ?
                        <>
                            <h2 className='mb-4'>{name}</h2>
                            <div className='row d-flex justify-content-center'>
                                <h3>You encountered</h3>
                                <Pokemon pokemon={enemyPokemon} className={"enemy-pokemon col-3 mb-5"} />
                            </div>

                            <div className='own-pokemons row d-flex justify-content-center'>
                                <h4 className='mb-4'>Own pokemons</h4>
                                <h5>Please choose a Pokemon</h5>
                                {ownedPokemons.map((pokemon, i) =>
                                    <Pokemon key={i} pokemon={pokemon} className={"own-pokemon choosable col-3"} setSelectedPokemon={() => setSelectedPokemon(pokemon)} />
                                )}
                            </div>
                        </> :
                        <p>loading...</p>}
            </div>
        )
    } else {
        return (
            <p>No encounter</p>
        )
    }

}


