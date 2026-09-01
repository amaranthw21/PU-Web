import { Link, useParams } from "react-router-dom";
import { factionsById } from "../data/factions";
import FactionInfobox from "../components/FactionInfobox";
import CountryQuote from "../components/CountryQuote";
import ContentToc from "../components/ContentToc";
import ContentBlock from "../components/ContentBlock";
import withBlockIds from "../lib/blocks";
import NotFound from "./NotFound";
import usePageAccent from "../lib/usePageAccent";


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


    usePageAccent(subFaction?.background, subFaction?.color);


    if(!subFaction){

        return <NotFound title="Faction not found" />;

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
