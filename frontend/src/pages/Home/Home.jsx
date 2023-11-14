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
    <div className='locations'>
        {locations.map((location, index) => <Locations key={index} location={location} />)}
    </div>
  )
}

export default Home
