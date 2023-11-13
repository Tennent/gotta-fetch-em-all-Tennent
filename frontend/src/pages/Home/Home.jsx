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

  return (
    <div className='locations'>
      <ul>
        {locations.map((location, index) => <Locations key={index} location={location} />)}
      </ul>
    </div>
  )
}

export default Home
