import { Link, useParams } from "react-router-dom";
import rules from "../../data/rules/rules";
import ContentToc from "../../components/ContentToc";
import ContentBlock from "../../components/ContentBlock";
import Paragraphs from "../../components/Paragraphs";
import withBlockIds from "../../lib/blocks";
import NotFound from "../NotFound";


// Un capítulo del rulesbook. Misma estructura que una ficha de Lore (miga de
// pan, entradilla, tabla de contenidos y bloques a ancho completo), pero sin
// cita ni infobox: aquí no hay nada que resumir en una caja, y las reglas se
// leen de arriba abajo.
export default function RuleChapter(){

    const { id } = useParams();


    const chapter = rules.find(
        chapter => chapter.id === id
    );


    const blocks = withBlockIds(chapter?.blocks);


    if(!chapter){

        return <NotFound title="Rule chapter not found" />;

    }


    return (

        <div>

            <nav className="breadcrumb">

                <Link to="/rulesbook">Rulesbook</Link>

                <span className="breadcrumb__sep">/</span>

                <span className="breadcrumb__current">
                    {chapter.name}
                </span>

            </nav>

            <h1 className="page-title">
                {chapter.name}
            </h1>


            <div className="country-body">

                {
                    chapter.description?.trim() && (

                        <div className="detail-intro">
                            <Paragraphs text={chapter.description} className="country-block__text" />
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
