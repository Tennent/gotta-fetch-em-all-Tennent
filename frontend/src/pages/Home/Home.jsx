import './Home.css'
import { fetchLocation } from '../../services/FetchLocations.js'
import Locations from '../../components/Locations.jsx'
import { useState, useEffect } from 'react'

function Home() {

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function getLocations() {
      const locations = [...Array(20).keys()].map((_, index) => fetchLocation(index + 1));

      setLocations(await Promise.all(locations));
    }
    getLocations();
  }, [])
  console.log(locations);

  return (
    <>
      <div className='header'>
        <header>
          <h1>Epic Pokemon Game</h1>
          <h2>Please choose a location!</h2>
        </header>
      </div>
      <div className='locations container-fluid'>
        <div className='row d-flex justify-content-center'>
          {locations.map(location => <Locations key={location.name} location={location} image={`${location.name}.jpg`} />)}
        </div>
      </div>
    </>
  )
}

export default Home
