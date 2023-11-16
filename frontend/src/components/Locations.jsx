import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import Area from "./Area";


export default function Locations({ location }) {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="location-container col-3"
        style={{backgroundImage: ""}}>
            <h2 className="location"
                onClick={() => { visible ? setVisible(false) : setVisible(true) }}
            >{location.name + ((location.areas.length > 0) ? "" : " (No area provided)")}</h2>
            <div className="areas">
            {
                location.areas.map((area, i) => <Area area={area} key={i} visible={visible} />)
            }
            </div>
        </div>
    )
}