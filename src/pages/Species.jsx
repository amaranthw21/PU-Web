import { mainSpecies, companionSpecies } from "../data/species";
import EntryCard from "../components/EntryCard";


export default function Species() {

    return (

        <div>

            <h1 className="page-title">
                Species
            </h1>

            <p className="page-intro">
                These are the species that inhabit the setting. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <hr className="section-divider" />


            <div className="grid card-grid">

                {
                    mainSpecies.map(specie => (

                        <EntryCard

                            key={specie.id}

                            name={specie.name}

                            image={specie.image}

                            imagePosition={specie.imagePosition}

                            imageZoom={specie.imageZoom}

                            link={`/species/${specie.id}`}

                        />

                    ))
                }

            </div>


            {
                companionSpecies.length > 0 && (

                    <>

                        <hr className="section-divider" />


                        <section className="category-section">

                            <h2 className="worlds-heading">
                                Companion Only
                            </h2>

                            <div className="grid card-grid card-grid--small">

                                {
                                    companionSpecies.map(specie => (

                                        <EntryCard

                                            key={specie.id}

                                            name={specie.name}

                                            image={specie.image}

                                            imagePosition={specie.imagePosition}

                                            imageZoom={specie.imageZoom}

                                            link={`/species/${specie.id}`}

                                        />

                                    ))
                                }

                            </div>

                        </section>

                    </>

                )
            }

        </div>

    );

}
