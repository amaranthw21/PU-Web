import { Link } from "react-router-dom";
import chronicles from "../../data/lore/chronicles";
import EntryCard from "../../components/EntryCard";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function Chronicles(){

    useDocumentTitle("Server Chronicles");


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Server Chronicles</span>
            </nav>

            <h1 className="page-title">
                Server Chronicles
            </h1>

            <p className="page-intro">
                What has actually happened in the server, written down. Each
                chronicle has its own page, and can point at the gods, worlds and
                factions it involved.
            </p>


            {
                chronicles.length === 0

                    ? (
                        <p className="tl-empty">
                            No chronicles written yet. They are added one by one
                            from the editing panel.
                        </p>
                    )

                    : (
                        <div className="grid card-grid">

                            {
                                chronicles.map(chronicle => (

                                    <EntryCard

                                        key={chronicle.id}

                                        name={chronicle.name}

                                        subtitle={chronicle.date || chronicle.summary}

                                        image={chronicle.image}

                                        imagePosition={chronicle.imagePosition}

                                        imageZoom={chronicle.imageZoom}

                                        link={`/lore/chronicles/${chronicle.id}`}

                                    />

                                ))
                            }

                        </div>
                    )
            }

        </div>

    );

}
