import { mainSpecies, companionSpecies } from "../data/species";
import GodCard from "../components/GodCard";


export default function Species() {

    return (

        <div>

            <h1 className="gods-title">
                Species
            </h1>

            <p className="gods-intro">
                These are the species that inhabit the setting. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <hr className="section-divider" />


            <div className="grid gods-grid">

                {
                    mainSpecies.map(specie => (

                        <GodCard

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


                        <section className="gods-section">

                            <h2 className="worlds-heading">
                                Companion Only
                            </h2>

                            <div className="grid gods-grid gods-grid--companion">

                                {
                                    companionSpecies.map(specie => (

                                        <GodCard

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
