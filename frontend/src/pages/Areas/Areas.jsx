import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchAreas } from '../../services/FetchLocations'
import { useEffect, useState } from 'react'

export default function Areas() {
    const { name } = useParams()
    const [area, setArea] = useState({})

    console.log(name);
    useEffect(() => {
        const fetchArea = async () => {
            setArea(await fetchAreas(name))
        }
        fetchArea()
    }, [])
    return (
        <>
         
        </>
    )
}


