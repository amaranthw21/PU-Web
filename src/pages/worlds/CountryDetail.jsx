import { Link, useParams } from "react-router-dom";
import { worldsById } from "../../data/worlds";
import CountryInfobox from "../../components/CountryInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import withBlockIds from "../../lib/blocks";
import NotFound from "../NotFound";
import usePageAccent from "../../lib/usePageAccent";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function CountryDetail(){

    const { worldId, countryId } = useParams();

    const world = worldsById[worldId];

    const country = world?.countries.find(
        country => country.id === countryId
    );


    const blocks = withBlockIds(country?.blocks);


    usePageAccent(country?.background, country?.color);


    const pageTitle = country?.name ?? "Country not found";

    useDocumentTitle(pageTitle);


    if(!country){

        return <NotFound title={pageTitle} />;

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


            {/*
              Arriba, dos columnas: la cita y la tabla de contenidos a la
              izquierda, y el infobox (Basic Information) a la derecha. El
              infobox solo ocupa su propio alto, así que los bloques van
              después a ancho completo en vez de dejar la mitad derecha vacía.
              En móvil se apila todo, con el infobox primero.
            */}
            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={country.quote} />

                    {/*
                      La tabla de contenidos se genera a partir de los propios
                      bloques, así que no hay que mantenerla a mano.
                    */}
                    <ContentToc sections={blocks} />

                </div>

                <CountryInfobox country={country} />

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
