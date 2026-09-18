import { Link } from "react-router-dom";
import EntryCard from "../../components/EntryCard";
import npcs, { npcCategories } from "../../data/lore/npcs/npcs";
import useDocumentTitle from "../../lib/useDocumentTitle";


export default function Npcs(){

    useDocumentTitle("NPCs");


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">NPCs</span>
            </nav>

            <h1 className="page-title">
                NPCs
            </h1>

            <p className="page-intro">
                The characters the staff plays. They exist in the setting and
                anyone can run into them, but no player owns them.
            </p>


            <hr className="section-divider" />


            {
                npcCategories.map(category => {

                    const npcsInCategory = npcs.filter(
                        npc => npc.category === category.id
                    );

                    // Si un grupo no tiene NPCs todavía, no lo mostramos.
                    if(npcsInCategory.length === 0){
                        return null;
                    }


                    return (

                        <section key={category.id} className="category-section">

                            <h2>
                                {category.label}
                            </h2>


                            <div className="grid card-grid">

                                {
                                    npcsInCategory.map(npc => (

                                        <EntryCard

                                            key={npc.id}

                                            name={npc.name}

                                            subtitle={npc.role}

                                            image={npc.image}

                                            imagePosition={npc.imagePosition}

                                            imageZoom={npc.imageZoom}

                                            link={`/lore/npcs/${npc.id}`}

                                        />

                                    ))
                                }

                            </div>

                        </section>

                    );

                })
            }


        </div>

    );

}
