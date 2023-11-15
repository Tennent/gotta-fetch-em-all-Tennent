import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPokemon } from '../../services/FetchPokemons';
import attack from '../../utils/attack';
import Pokemon from '../../components/Pokemon';
import Message from '../../components/Message';
import './Battle.css'


export default function Battle() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedParams = queryParams.get('selected');
  const enemyParams = queryParams.get('enemy');

  const [selected, setSelected] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function battleSetup() {
      if (!enemy && !selected) {
        setSelected(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${selectedParams}`));
        setEnemy(await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${enemyParams}`));
      } else if (enemy) {
        setMessage(`wild ${enemy.name} appeared`)
      }
    }
    battleSetup();
  }, [enemy, selected]);

  return (
    (selected && enemy) ?
      (<div id='battle'>
        <Pokemon className="enemy" pokemon={enemy} health={enemy.stats[0].base_stat} />
        <Pokemon className="friendly" pokemon={selected} health={selected.stats[0].base_stat} />
        <Message message={message} />
      </div>) :
      (<p>Loading...</p>)
  )
}