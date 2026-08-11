import { Link, useParams } from "react-router-dom";
import { factionsById } from "../data/factions";
import FactionCard from "../components/FactionCard";
import Paragraphs from "../components/Paragraphs";


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


            {/*
              La entradilla la escriben los mods desde el CMS, igual que la de un
              mundo. Si está vacía no se pinta el recuadro, para no dejar un
              hueco en los hubs que todavía no la tienen.
            */}
            {
                faction.presentation?.trim() && (

                    <div className="world-presentation">
                        <Paragraphs text={faction.presentation} />
                    </div>

                )
            }


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

                        <section key={group.id} className="category-section">

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
