import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { worldsById } from "../../data/worlds";
import CountryInfobox from "../../components/CountryInfobox";
import CountryQuote from "../../components/CountryQuote";
import CountryToc from "../../components/CountryToc";
import CountryBlock from "../../components/CountryBlock";
import asset from "../../lib/asset";
import slug from "../../lib/slug";


export default function CountryDetail(){

    const { worldId, countryId } = useParams();

    const world = worldsById[worldId];

    const country = world?.countries.find(
        country => country.id === countryId
    );


    // Los bloques se identifican por su título. Se descartan los que no tienen
    // título (fila a medio rellenar en el CMS) y, si dos coinciden, al segundo
    // se le añade un sufijo para que las anclas sigan siendo únicas.
    const usedIds = [];

    const blocks = (country?.blocks ?? [])
        .filter(block => block?.title?.trim())
        .map(block => {

            const base = slug(block.title);
            let id = base;
            let n = 2;

            while(usedIds.includes(id)){
                id = `${base}-${n}`;
                n += 1;
            }

            usedIds.push(id);

            return { ...block, id };

        });


    // Mientras estás en la ficha del país, el fondo de la página es su imagen.
    // Al salir (o cambiar de país) se restaura el anterior. Los países que
    // todavía son placeholders no tienen `background`, así que se quedan con
    // el fondo por defecto.
    useEffect(() => {

        if(!country?.background){
            return;
        }

        const body = document.body;
        const prevBg = body.style.backgroundImage;

        body.style.backgroundImage = `url(${asset(country.background)})`;

        return () => {
            body.style.backgroundImage = prevBg;
        };

    }, [country?.background]);


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
                    <CountryToc sections={blocks} />

                </div>

                <CountryInfobox country={country} />

            </div>


            <div className="country-body">

                {
                    blocks.map((block, i) => (

                        <div key={block.id}>

                            {i > 0 && <hr className="section-divider" />}

                            <CountryBlock block={block} />

                        </div>

                    ))
                }

            </div>

        </div>

    );

}
