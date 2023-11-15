import React from 'react'

export default function Pokemon({ pokemon, setSelectedPokemon, health, className }) {
    return (
        <div className={className} onClick={setSelectedPokemon}>
            <h2>{pokemon.name}</h2>
            <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
            {health ? (<p>{health}</p>) : ""}
        </div>
    )
}