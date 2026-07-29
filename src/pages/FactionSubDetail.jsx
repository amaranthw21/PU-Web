import { Link, useParams } from "react-router-dom";
import { factionsById } from "../data/factions";


export default function FactionSubDetail(){

    const { id, factionId } = useParams();

    const faction = factionsById[id];

    const subFaction = faction?.subFactions.find(
        sub => sub.id === factionId
    );


    if(!subFaction){

        return <h1>Faction not found</h1>;

    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/factions">Factions</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to={`/factions/${faction.id}`}>{faction.name}</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{subFaction.name}</span>
            </nav>

            <h1 className="page-title">
                {subFaction.name}
            </h1>


            <p className="world-presentation">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>


        </div>

    );

}
