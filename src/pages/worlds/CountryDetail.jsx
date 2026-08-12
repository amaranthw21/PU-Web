import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { worldsById } from "../../data/worlds";
import CountryInfobox from "../../components/CountryInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import asset from "../../lib/asset";
import withBlockIds from "../../lib/blocks";


export default function CountryDetail(){

    const { worldId, countryId } = useParams();

    const world = worldsById[worldId];

    const country = world?.countries.find(
        country => country.id === countryId
    );


    const blocks = withBlockIds(country?.blocks);


    // Mientras estás en la ficha del país, el fondo de la página es su imagen
    // y el color de acento (marco, título, infobox...) pasa a ser el suyo.
    // Al salir (o cambiar de país) se restaura todo. Los países que todavía son
    // placeholders no tienen ni `background` ni `color`, así que se quedan con
    // el fondo y el acento por defecto.
    useEffect(() => {

        if(!country?.background && !country?.color){
            return;
        }

        const body = document.body;
        const prevBg = body.style.getPropertyValue("--page-bg");
        const prevAccent = body.style.getPropertyValue("--accent");

        if(country.background){
            body.style.setProperty("--page-bg", `url(${asset(country.background)})`);
        }

        if(country.color){
            body.style.setProperty("--accent", country.color);
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

    }, [country?.background, country?.color]);


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
