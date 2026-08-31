import { Link, useParams } from "react-router-dom";
import species from "../data/species";
import SpeciesInfobox from "../components/SpeciesInfobox";
import CountryQuote from "../components/CountryQuote";
import ContentToc from "../components/ContentToc";
import ContentBlock from "../components/ContentBlock";
import Paragraphs from "../components/Paragraphs";
import withBlockIds from "../lib/blocks";
import NotFound from "./NotFound";
import usePageAccent from "../lib/usePageAccent";
import useDocumentTitle from "../lib/useDocumentTitle";


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


    usePageAccent(specie?.background, specie?.color);


    const pageTitle = specie?.name ?? "Species not found";

    useDocumentTitle(pageTitle);


    if(!specie){

        return <NotFound title={pageTitle} />;

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
