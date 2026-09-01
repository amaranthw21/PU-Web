import { Link } from "react-router-dom";
import timeline from "../data/lore/timeline";
import TimelineEra from "../components/TimelineEra";
import ContentToc from "../components/ContentToc";
import slug from "../lib/slug";


export default function Timeline(){

    // Cada era necesita un ancla para la tabla de contenidos y para poder
    // enlazarla suelta. Sale de su nombre, como en las fichas.
    const eras = timeline
        .filter(era => era.name?.trim())
        .map(era => ({ ...era, id: slug(era.name) }));


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Timeline</span>
            </nav>

            <h1 className="page-title">
                Timeline
            </h1>

            <p className="page-intro">
                A chronological record of the events that shaped the world. Each
                era runs along its own line: events hang above and below it, and
                the line can be dragged sideways when it doesn&apos;t fit.
            </p>


            <ContentToc sections={eras.map(era => ({ id: era.id, title: era.name }))} />


            {
                eras.map(era => (

                    <TimelineEra key={era.id} era={era} />

                ))
            }

        </div>

    );

}
