import { Link } from "react-router-dom";
import GodCard from "../../components/GodCard";
import gods, { godCategories } from "../../data/lore/gods/gods";


export default function Gods(){

    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Gods</span>
            </nav>

            <h1 className="gods-title">
                Gods
            </h1>

            <p className="gods-intro">
                These are the gods or deities that are considered active within
                the server. In other words, they are the only gods that are
                confirmed to truly exist in the setting.
            </p>


            <hr className="section-divider" />


            {
                godCategories.map(category => {

                    const godsInCategory = gods.filter(
                        god => god.category === category.id
                    );

                    // Si un grupo no tiene dioses todavía, no lo mostramos.
                    if(godsInCategory.length === 0){
                        return null;
                    }


                    return (

                        <section key={category.id} className="gods-section">

                            <h2>
                                {category.label}
                            </h2>


                            <div className="grid gods-grid">

                                {
                                    godsInCategory.map(god => (

                                        <GodCard

                                            key={god.id}

                                            name={god.name}

                                            domain={god.domain}

                                            image={god.image}

                                            imagePosition={god.imagePosition}

                                            imageZoom={god.imageZoom}

                                            link={`/lore/gods/${god.id}`}

                                        />

                                    ))
                                }

                            </div>

                        </section>

                    );

                })
            }


            <hr className="section-divider" />


            <section className="gods-faq">

                <h2>
                    FAQ
                </h2>

                <h3>
                    Does this mean I can’t create a deity for my character’s
                    backstory or their faction?
                </h3>

                <p>
                    Yes and no. Just as our real world has hundreds of different
                    gods and belief systems, you can assume something similar
                    exists in the Sonic world as well.
                </p>

                <p>
                    Because of this, you’re free to create a deity for your
                    character or their organization if it’s necessary for their
                    lore. However, that deity will not be considered active
                    within the setting. This means it does not truly exist in
                    the world and cannot influence it in any way—such as granting
                    powers or performing miracles. Essentially, it will only
                    function as a belief, a name, or a symbolic figure within
                    that group’s culture or religion.
                </p>

            </section>


        </div>

    );

}
