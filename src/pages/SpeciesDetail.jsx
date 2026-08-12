import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import species from "../data/species";
import SpeciesInfobox from "../components/SpeciesInfobox";
import CountryQuote from "../components/CountryQuote";
import ContentToc from "../components/ContentToc";
import ContentBlock from "../components/ContentBlock";
import Paragraphs from "../components/Paragraphs";
import asset from "../lib/asset";
import withBlockIds from "../lib/blocks";


// Ficha de una especie. Misma estructura que la de una facción
// (FactionSubDetail): la cita y la tabla de contenidos arriba a la izquierda, el
// Basic Information a la derecha y los bloques debajo a ancho completo. Su
// último apartado lista personajes, igual que el de una facción: aquí son los
// ejemplos conocidos de la especie.
export default function SpeciesDetail(){

    const { id } = useParams();


    const specie = species.find(
        specie => specie.id === id
    );


    const blocks = withBlockIds(specie?.blocks);


    // Mientras estás en la ficha de la especie, el fondo de la página es su
    // imagen de fondo y el color de acento (marco, título, infobox...) pasa a
    // ser el suyo. Al salir (o cambiar de especie) se restaura todo. Las
    // especies que todavía son placeholders no tienen ni `background` ni
    // `color`, así que se quedan con el fondo y el acento por defecto.
    useEffect(() => {

        if(!specie?.background && !specie?.color){
            return;
        }

        const body = document.body;
        const prevBg = body.style.getPropertyValue("--page-bg");
        const prevAccent = body.style.getPropertyValue("--accent");

        if(specie.background){
            body.style.setProperty("--page-bg", `url(${asset(specie.background)})`);
        }

        if(specie.color){
            body.style.setProperty("--accent", specie.color);
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

    }, [specie?.background, specie?.color]);


    if(!specie){

        return <h1>Species not found</h1>;

    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/species">Species</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{specie.name}</span>
            </nav>

            <h1 className="page-title">
                {specie.name}
            </h1>


            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={specie.quote} />

                    {/*
                      La entradilla: es lo único que se aparta de la ficha de
                      facción, que no la tiene. Las especies ya traían el campo
                      `description` de antes, y dioses e items lo pintan así
                      mismo, antes del índice.
                    */}
                    {
                        specie.description?.trim() && (

                            <div className="detail-intro">
                                <Paragraphs text={specie.description} className="country-block__text" />
                            </div>

                        )
                    }

                    {/*
                      La tabla de contenidos se genera a partir de los propios
                      bloques, así que no hay que mantenerla a mano.
                    */}
                    <ContentToc sections={blocks} />

                </div>

                <SpeciesInfobox specie={specie} />

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
