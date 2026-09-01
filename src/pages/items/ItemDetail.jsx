import { Link, useParams } from "react-router-dom";
import items from "../../data/lore/items/items";
import ItemInfobox from "../../components/ItemInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import Paragraphs from "../../components/Paragraphs";
import withBlockIds from "../../lib/blocks";
import NotFound from "../NotFound";
import usePageAccent from "../../lib/usePageAccent";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function ItemDetail(){

    const { id } = useParams();


    const item = items.find(
        item => item.id === id
    );


    const blocks = withBlockIds(item?.blocks);


    usePageAccent(item?.image, item?.color);


    const pageTitle = item?.name ?? "Item not found";

    useDocumentTitle(pageTitle);


    if(!item){

        return <NotFound title={pageTitle} />;

    }


    return (

        <div className="entry-detail">

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/items">Important Items</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{item.name}</span>
            </nav>

            <h1 className="entry-detail__name">
                {item.name}
            </h1>


            {/*
              Misma estructura que la ficha de dios: arriba, la cita, la
              entradilla y la tabla de contenidos a la izquierda y el infobox a
              la derecha; debajo, los bloques a ancho completo.
            */}
            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={item.quote} />

                    {
                        item.description?.trim() && (

                            <div className="detail-intro">
                                <Paragraphs text={item.description} className="country-block__text" />
                            </div>

                        )
                    }

                    <ContentToc sections={blocks} />

                </div>

                <ItemInfobox item={item} />

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
