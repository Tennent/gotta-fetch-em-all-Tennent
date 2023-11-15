import { useNavigate } from "react-router-dom"
import React from 'react'

export default function BattleButton({ selectedPokemon, enemyPokemon }) {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            onClick={() => navigate(`/battle?selected=${selectedPokemon.name}&enemy=${enemyPokemon.name}`)}>
            Start Battle
        </button>
    )
}
