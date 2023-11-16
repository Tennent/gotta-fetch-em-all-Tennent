import React from 'react'

export default function Pokemon({ pokemon, setSelectedPokemon, health, maxHp, className }) {
    return (
        <div className={className} onClick={setSelectedPokemon}>
            <h2>{pokemon.name}</h2>
            <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
            {health ?
                <div className="progress" style={{ width: maxHp }}>
                    <div className="progress-bar" role="progressbar" aria-valuenow={health} style={{ width: health }} aria-valuemin={health} aria-valuemax={health}>{health}</div>
                </div> :
                ""}
        </div>
    )
}