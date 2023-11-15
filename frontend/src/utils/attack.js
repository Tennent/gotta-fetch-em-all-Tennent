import fetchMove from "../services/FetchMove"
import random from "./random"

export default async function attack(attackerPokemon, defenderPokemon) {

    let randomMove = await fetchMove(attackerPokemon.moves[random(attackerPokemon.moves.length)].move.url)
    let attackerTypes = attackerPokemon.types.map(type => type.type.name)
    const typeModifiers = [25, 20, 15, 10, 5, 2,5]

    const A = 1 // attacker's Level
    const B = attackerPokemon.stats[1].base_stat // attacker's Attack or Special
    const C = randomMove.power || 10 // attack Power
    const D = defenderPokemon.stats[2].base_stat // defender's Defense or Special
    const X = attackerTypes.includes(randomMove.type.name) ? 1.5 : 1 // same-Type attack bonus (1 or 1.5)
    const Y = typeModifiers[random(typeModifiers.length)] // Type modifiers (40, 20, 10, 5, 2.5, or 0)
    const Z = 217 + random(255-217) // a random number between 217 and 255

    console.log("Damage:" + Math.ceil(((((((((2 * A / 5 + 2) * B * C) / D) / 50) + 2) * X) * Y / 10) * Z) / 255));
    return {
        name: randomMove.name,
        damage: Math.ceil(((((((((2 * A / 5 + 2) * B * C) / D) / 50) + 2) * X) * Y / 10) * Z) / 255)
    }
}
