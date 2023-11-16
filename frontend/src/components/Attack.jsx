import React from 'react'

export default function Attack({ startRound }) {
    return (
        <button className='btn mt-4 mb-1' onClick={startRound}>Attack</button>
    )
}
