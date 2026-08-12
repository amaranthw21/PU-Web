import { Fragment } from "react";
import { Link } from "react-router-dom";
import ContentToc from "./ContentToc";
import ContentBlock from "./ContentBlock";
import CountryQuote from "./CountryQuote";
import Paragraphs from "./Paragraphs";
import NotFound from "../pages/NotFound";
import withBlockIds from "../lib/blocks";


// Ficha de una entrada de Lore (energías, poderes, transformaciones e items).
// Misma estructura que la ficha de país, pero a ancho completo: aquí no hay
// Basic Information a la derecha. Primero la cita, la entradilla y la tabla de
// contenidos, y debajo los bloques con su separador.
//
// `trail` son los niveles de la miga de pan que van entre "Lore" y el nombre de
// la entrada, p. ej. [{ label: "Mechanics", to: "/lore/energy-powers" },
// { label: "Powers", to: "/lore/energy-powers/powers" }].
export default function LoreDetail({ item, trail, notFound }){

    const blocks = withBlockIds(item?.blocks);


    if(!item){

        return <NotFound title={notFound} />;

    }


    return (

        <div>

            <nav className="breadcrumb">

                <Link to="/lore">Lore</Link>

                {
                    (trail ?? []).map(level => (

                        <Fragment key={level.to}>

                            <span className="breadcrumb__sep">/</span>

                            <Link to={level.to}>
                                {level.label}
                            </Link>

                        </Fragment>

                    ))
                }

                <span className="breadcrumb__sep">/</span>

                <span className="breadcrumb__current">
                    {item.name}
                </span>

            </nav>

            <h1 className="page-title">
                {item.name}
            </h1>


            <div className="country-body">

                <CountryQuote messages={item.quote} />

                {
                    item.description?.trim() && (

                        <div className="detail-intro">
                            <Paragraphs text={item.description} className="country-block__text" />
                        </div>

                    )
                }

                <ContentToc sections={blocks} />

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
