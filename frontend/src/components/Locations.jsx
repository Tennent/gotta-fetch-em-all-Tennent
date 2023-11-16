import React, { useState } from 'react'
import Area from "./Area";


export default function Locations({ location, image }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="location-container col-3 m-2"
        style={{backgroundImage: `url("/src/assets/images/${image}")`}}>
            <h5 className="location"
                onClick={() => { visible ? setVisible(false) : setVisible(true) }}
            >{location.name + ((location.areas.length > 0) ? "" : " (No area provided)")}</h5>
            <div className="areas">
            {
                location.areas.map((area, i) => <Area area={area} key={i} visible={visible} />)
            }
            </div>
        </div>
    )
}