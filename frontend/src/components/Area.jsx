import { useNavigate } from "react-router-dom"

export default function Area({ area, visible }) {
    const navigate = useNavigate();
    return (visible) ? (<p
        className="area"
        onClick={() => navigate(`/areas/${area.name}`)}>
        {area.name}
    </p>) : ""
}
