import { Link } from "react-router-dom";
import species from "../data/species";


export default function Species() {

    return (

        <div>

            <h1 className="page-title">
                Species
            </h1>


            <div className="worlds-row species-row">

                {
                    species.map(specie => (

                        <Link
                            key={specie.id}
                            to={`/species/${specie.id}`}
                            className="world-btn"
                        >

                            <span className="world-btn__circle">

                                {
                                    specie.image && (
                                        <span
                                            className="world-btn__img"
                                            style={{
                                                backgroundImage: `url(${specie.image})`,
                                                backgroundPosition: specie.imagePosition || "center",
                                                transform: specie.imageZoom ? `scale(${specie.imageZoom})` : undefined,
                                                transformOrigin: specie.imagePosition || "center"
                                            }}
                                        />
                                    )
                                }

                            </span>

                            <span className="world-btn__label">
                                {specie.name}
                            </span>

                        </Link>

                    ))
                }

            </div>

        </div>

    );

}
