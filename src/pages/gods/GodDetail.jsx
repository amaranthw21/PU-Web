import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import gods from "../../data/lore/gods/gods";
import GodInfobox from "../../components/GodInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import Paragraphs from "../../components/Paragraphs";
import asset from "../../lib/asset";
import withBlockIds from "../../lib/blocks";


export default function GodDetail(){

    const { id } = useParams();


    const god = gods.find(
        god => god.id === id
    );


    const blocks = withBlockIds(god?.blocks);


    // Mientras estás en la ficha del dios, el fondo de la página es su imagen
    // y el color de acento (marco, nombre...) pasa a ser el suyo.
    // Al salir (o cambiar de dios) se restaura todo.
    useEffect(() => {

        if(!god){
            return;
        }

        const body = document.body;
        const prevBg = body.style.getPropertyValue("--page-bg");
        const prevAccent = body.style.getPropertyValue("--accent");

        if(god.image){
            body.style.setProperty("--page-bg", `url(${asset(god.image)})`);
        }

        if(god.color){
            body.style.setProperty("--accent", god.color);
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

    }, [god?.image, god?.color]);


    if(!god){

        return <h1>God not found</h1>

    }


    return (

        <div className="entry-detail">

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/gods">Gods</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">
                    {god.name}
                </span>
            </nav>

            <h1 className="entry-detail__name">
                {god.name}
            </h1>


            {/*
              Misma estructura que la ficha de país: arriba, la cita y la tabla
              de contenidos a la izquierda y el infobox a la derecha; debajo,
              los bloques a ancho completo.
            */}
            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={god.quote} />

                    {
                        god.description?.trim() && (

                            <div className="detail-intro">
                                <Paragraphs text={god.description} className="country-block__text" />
                            </div>

                        )
                    }

                    <ContentToc sections={blocks} />

                </div>

                <GodInfobox god={god} />

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

    )

}
