import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Locations({location}) {
    const navigate = useNavigate();
    return <li onClick={() => navigate(`/areas/${location.areas[0]["name"]}`)}>{location.name}</li>
}