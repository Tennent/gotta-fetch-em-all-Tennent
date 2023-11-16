import React from 'react'

export default function Pokemon({ pokemon, setSelectedPokemon, health, maxHp, className }) {
    return (
        <div className={className} onClick={setSelectedPokemon}>
            <img className='pokemon-image' src={pokemon.sprites.front_default} alt="pokemon image" />
            <h6>{pokemon.name}</h6>

            {health ?
                <>
                    <div className="progress" style={{ width: maxHp }}>
                        <div className="progress-bar" role="progressbar" aria-valuenow={health} style={{ width: health }} aria-valuemin={health} aria-valuemax={health}></div>
                    </div>
                    <p>{health}</p>
                </>:
                ""}
        </div>
    )
}