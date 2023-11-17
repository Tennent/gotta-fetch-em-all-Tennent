import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPokemon } from '../../services/FetchPokemons';
import attack from '../../utils/attack';
import Pokemon from '../../components/Pokemon';
import Message from '../../components/Message';
import Attack from '../../components/Attack'
import './Battle.css'

export default function Battle() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedParams = queryParams.get('selected');
  const enemyParams = queryParams.get('enemy');

  const [selected, setSelected] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [message, setMessage] = useState("");

  const [selectedMaxHp, setSelectedMaxHp] = useState(0);
  const [enemyMaxHp, setEnemyMaxHp] = useState(0);

  const [selectedHp, setSelectedHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(0);

  const [isFinished, setIsFinshed] = useState(false);
  const [isplayerTurn, setIsPlayerTurn] = useState(false)
  const [alreadyCaptured, setAlreadyCaptured] = useState(false)

  useEffect(() => {
    async function battleSetup() {
      // If enemy and selected pokemon is not fetched yet:
      if (!enemy && !selected) {
        setSelected(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${selectedParams}`));
        setEnemy(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${enemyParams}`));
        // After the enemy and selected pokemon is fetched
      } else if (enemy && selected) {
        setMessage(`A wild ${enemy.name} appeared`)
        setSelectedMaxHp(selected.stats[0].base_stat)
        setEnemyMaxHp(enemy.stats[0].base_stat)

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
  }, [enemyHp, selectedHp])

  useEffect(() => {
    if (isFinished) {
      const storeCapturedPokemon = async () => {
        const response = await fetch("/api/pokemons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: `https://pokeapi.co/api/v2/pokemon/${enemy.name}` })
        })
        response.status === 208 ? setAlreadyCaptured(true) : setAlreadyCaptured(false);
      }
      if (enemyHp <= 0) {
        storeCapturedPokemon();
      }
    }
  }, [isFinished])

  async function attackMove() {
    const playerAttack = await attack(selected, enemy)

    setEnemyHp(enemyHp - playerAttack.damage)
    setMessage(`${selected.name} used ${playerAttack.name} dealing ${playerAttack.damage} damage.`)
    setIsPlayerTurn(false)
    if (enemyHp <= 0) {
      return
    }
    setTimeout(() => {
      setMessage(`${enemy.name} is preparing for the attack...`)
    }, 4000);

    setTimeout(async () => {
      const enemyAttack = await attack(enemy, selected)
      setMessage(`${enemy.name} used ${enemyAttack.name}
          dealing ${enemyAttack.damage} damage.`)
      setSelectedHp(selectedHp - enemyAttack.damage)
    }, 8000);

    setTimeout(() => {
      setIsPlayerTurn(true)
    }, 10000);

  }

  return (
    (alreadyCaptured && isFinished && enemyHp <= 0) ? <><h1>You won the battle, but {enemy.name} was already captured</h1><button className='btn' onClick={() => navigate("/")}>Back to Locations</button></> :
      (isFinished && enemyHp <= 0) ? <><h1>You won the battle and captured {enemy.name}</h1><button className='btn' onClick={() => navigate("/")}>Back to Locations</button></> :
        (isFinished) ? <><h1>You lost the battle</h1><button className='btn' onClick={() => navigate("/")}>Back to Locations</button></> :
          (selected && enemy) ?
            (<div id='battle'>
              <h2>Battle</h2>
              <Pokemon className="enemy enemy-pokemon" pokemon={enemy} health={enemyHp} maxHp={enemyMaxHp} />
              <Pokemon className="friendly own-pokemon" pokemon={selected} health={selectedHp} maxHp={selectedMaxHp} />
              <Message message={message} />
              {(isplayerTurn) ? (<Attack startRound={attackMove} />) : ""}
            </div>) :
            (<p>Loading...</p>)
  )
}

