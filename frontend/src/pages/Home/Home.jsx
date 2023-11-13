
import './Home.css'
import { useState, useEffect } from 'react'

function Home() {

  const [test, setTest] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/test");
      const data = await res.json();

      setTest(data)
    }
    fetchData()
  }, [])

  return (
    <>
      {test ? test.message : "Hello!"}
    </>
  )
}

export default Home
