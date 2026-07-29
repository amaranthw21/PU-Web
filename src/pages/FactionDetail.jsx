import { Link, useParams } from "react-router-dom";
import { factionsById } from "../data/factions";
import FactionCard from "../components/FactionCard";


export default function FactionDetail(){

    const { id } = useParams();

    const faction = factionsById[id];


    if(!faction){

        return (
            <h1>
                Faction not found
            </h1>
        );

    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/factions">Factions</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{faction.name}</span>
            </nav>

            <h1 className="page-title">
                {faction.name}
            </h1>


            <p className="world-presentation">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <hr className="section-divider" />


            {
                (faction.factionGroups ?? []).map(group => {

                    const groupFactions = faction.subFactions.filter(
                        sub => sub.type === group.id
                    );

                    if(groupFactions.length === 0){
                        return null;
                    }


                    return (

                        <section key={group.id} className="gods-section">

                            <h2 className="worlds-heading">
                                {group.label}
                            </h2>

                            <div className="grid faction-grid">

                                {
                                    groupFactions.map(sub => (
                                        <FactionCard key={sub.id} faction={sub} />
                                    ))
                                }

                            </div>

                        </section>

                    );

                })
            }


        </div>

    );

}
