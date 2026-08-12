import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { factionsById } from "../data/factions";
import FactionInfobox from "../components/FactionInfobox";
import CountryQuote from "../components/CountryQuote";
import ContentToc from "../components/ContentToc";
import ContentBlock from "../components/ContentBlock";
import asset from "../lib/asset";
import withBlockIds from "../lib/blocks";


// Ficha de una facción. Misma estructura que la de un país (CountryDetail): la
// cita y la tabla de contenidos arriba a la izquierda, el Basic Information a la
// derecha y los bloques debajo a ancho completo. La única diferencia de fondo es
// que su último apartado lista personajes en vez de lugares.
export default function FactionSubDetail(){

    const { id, factionId } = useParams();

    const faction = factionsById[id];

    const subFaction = faction?.subFactions.find(
        sub => sub.id === factionId
    );


    const blocks = withBlockIds(subFaction?.blocks);


    // Mientras estás en la ficha de la facción, el fondo de la página es su
    // imagen y el color de acento (marco, título, infobox...) pasa a ser el
    // suyo. Al salir (o cambiar de facción) se restaura todo. Las facciones que
    // todavía son placeholders no tienen ni `background` ni `color`, así que se
    // quedan con el fondo y el acento por defecto.
    useEffect(() => {

        if(!subFaction?.background && !subFaction?.color){
            return;
        }

        const body = document.body;
        const prevBg = body.style.getPropertyValue("--page-bg");
        const prevAccent = body.style.getPropertyValue("--accent");

        if(subFaction.background){
            body.style.setProperty("--page-bg", `url(${asset(subFaction.background)})`);
        }

        if(subFaction.color){
            body.style.setProperty("--accent", subFaction.color);
        }

        return () => {
            if(prevBg){
                body.style.setProperty("--page-bg", prevBg);
            } else {
                body.style.removeProperty("--page-bg");
            }

            if(prevAccent){
                body.style.setProperty("--accent", prevAccent);
            } else {
                body.style.removeProperty("--accent");
            }
        };

    }, [subFaction?.background, subFaction?.color]);


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


            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={subFaction.quote} />

                    {/*
                      La tabla de contenidos se genera a partir de los propios
                      bloques, así que no hay que mantenerla a mano.
                    */}
                    <ContentToc sections={blocks} />

                </div>

                <FactionInfobox faction={subFaction} />

            </div>


            <div className="country-body">

                {
                    blocks.map((block, i) => (

                        <div key={block.id}>

                            {i > 0 && <hr className="section-divider" />}

                            <ContentBlock block={block} />

                        </div>

                    ))
                }

            </div>

        </div>

    );

}
