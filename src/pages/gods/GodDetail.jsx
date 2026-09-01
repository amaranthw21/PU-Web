import { Link, useParams } from "react-router-dom";
import gods from "../../data/lore/gods/gods";
import GodInfobox from "../../components/GodInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import Paragraphs from "../../components/Paragraphs";
import withBlockIds from "../../lib/blocks";
import NotFound from "../NotFound";
import usePageAccent from "../../lib/usePageAccent";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function GodDetail(){

    const { id } = useParams();


    const god = gods.find(
        god => god.id === id
    );


    const blocks = withBlockIds(god?.blocks);


    usePageAccent(god?.image, god?.color);


    const pageTitle = god?.name ?? "God not found";

    useDocumentTitle(pageTitle);


    if(!god){

        return <NotFound title={pageTitle} />;

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
