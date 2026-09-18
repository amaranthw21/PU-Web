import { Link, useParams } from "react-router-dom";
import npcs from "../../data/lore/npcs/npcs";
import NpcInfobox from "../../components/NpcInfobox";
import CountryQuote from "../../components/CountryQuote";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import Paragraphs from "../../components/Paragraphs";
import withBlockIds from "../../lib/blocks";
import NotFound from "../NotFound";
import usePageAccent from "../../lib/usePageAccent";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function NpcDetail(){

    const { id } = useParams();


    const npc = npcs.find(
        npc => npc.id === id
    );


    const blocks = withBlockIds(npc?.blocks);


    usePageAccent(npc?.image, npc?.color);


    const pageTitle = npc?.name ?? "NPC not found";

    useDocumentTitle(pageTitle);


    if(!npc){

        return <NotFound title={pageTitle} />;

    }


    return (

        <div className="entry-detail">

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/npcs">NPCs</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">
                    {npc.name}
                </span>
            </nav>

            <h1 className="entry-detail__name">
                {npc.name}
            </h1>


            {/*
              Misma estructura que la ficha de dios: arriba, la cita y la tabla
              de contenidos a la izquierda y el infobox a la derecha; debajo,
              los bloques a ancho completo.
            */}
            <div className="country-layout">

                <div className="country-layout__top">

                    <CountryQuote messages={npc.quote} />

                    {
                        npc.description?.trim() && (

                            <div className="detail-intro">
                                <Paragraphs text={npc.description} className="country-block__text" />
                            </div>

                        )
                    }

                    <ContentToc sections={blocks} />

                </div>

                <NpcInfobox npc={npc} />

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
