import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPokemon } from '../../services/FetchPokemons';
import attack from '../../utils/attack';
import Pokemon from '../../components/Pokemon';
import Message from '../../components/Message';
import Attack from '../../components/Attack'
import './Battle.css'

export default function Battle() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedParams = queryParams.get('selected');
  const enemyParams = queryParams.get('enemy');

  const [selected, setSelected] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedHp, setSelectedHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(0);
  const [isFinished, setIsFinshed] = useState(false);
  const [isplayerTurn, setIsPlayerTurn] = useState(false)

  useEffect(() => {
    async function battleSetup() {
      // If enemy and selected pokemon is not fetched yet:
      if (!enemy && !selected) {
        setSelected(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${selectedParams}`));
        setEnemy(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${enemyParams}`));
        // After the enemy and selected pokemon is fetched
      } else if (enemy && selected) {
        setMessage(`A wild ${enemy.name} appeared`)
        setSelectedHp(selected.stats[0].base_stat)
        setEnemyHp(enemy.stats[0].base_stat)

        setTimeout(() => {
          setIsPlayerTurn(true)
        }, 2000);
        
      }
    }
    battleSetup();
  }, [enemy, selected]);

  useEffect(() => {
    if ((selectedHp <= 0) || (enemyHp <= 0)) {
      const timeout = setTimeout(() => {
        setIsFinshed(true)
      }, 2000);
      return () => { clearTimeout(timeout) }
    }
  }, [selectedHp, enemyHp])

  async function attackMove() {

    const playerAttack = await attack(selected, enemy)
    setEnemyHp(enemyHp - playerAttack.damage)
    setMessage(`${selected.name} used ${playerAttack.name}
    dealing ${playerAttack.damage} damage.`)
    setIsPlayerTurn(false)

    setTimeout(() => {
      setMessage(`${enemy.name} is preparing for the attack...`)
    }, 4000);

    setTimeout(async () => {
      const enemyAttack = await attack(enemy, selected)
      setMessage(`Enemy used ${enemyAttack.name}
      dealing ${enemyAttack.damage} damage.`)
      setSelectedHp(selectedHp - enemyAttack.damage)
    }, 8000);

    setTimeout(() => {
      setIsPlayerTurn(true)
    }, 10000);

  }
  console.log(selectedHp);
  console.log(enemyHp);

  return (
    (isFinished && selectedHp <= 0) ? <h1>You lost the battle</h1> :
      (isFinished && enemyHp <= 0) ? <h1>You won the battle and captured {enemy.name}</h1> :
        (selected && enemy) ?
          (<div id='battle'>
            <Pokemon className="enemy" pokemon={enemy} health={enemyHp} />
            <Pokemon className="friendly" pokemon={selected} health={selectedHp} />
            <Message message={message} />
            {(isplayerTurn) ? (<Attack startRound={attackMove} />) : ""}
          </div>) :
          (<p>Loading...</p>)
  )
}