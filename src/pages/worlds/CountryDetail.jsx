import { Link, useParams } from "react-router-dom";
import { worldsById } from "../../data/worlds";


export default function CountryDetail(){

    const { worldId, countryId } = useParams();

    const world = worldsById[worldId];

    const country = world?.countries.find(
        country => country.id === countryId
    );


    if(!country){

        return <h1>Country not found</h1>;

    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/worlds">Worlds</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to={`/worlds/${world.id}`}>{world.name}</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{country.name}</span>
            </nav>

            <h1 className="page-title">
                {country.name}
            </h1>

        </div>

    );

}
