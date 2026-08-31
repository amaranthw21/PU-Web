import { Link } from "react-router-dom";
import { mainFactions, sideFactions } from "../data/factions";
import asset from "../lib/asset";
import useDocumentTitle from "../lib/useDocumentTitle";


function FactionButton({ faction }) {

    const content = (
        <>
            <span className="world-btn__circle">

                {
                    faction.image && (
                        <span
                            className="world-btn__img"
                            style={{
                                backgroundImage: `url(${asset(faction.image)})`,
                                backgroundPosition: faction.imagePosition || "center",
                                transform: faction.imageZoom ? `scale(${faction.imageZoom})` : undefined,
                                transformOrigin: faction.imagePosition || "center"
                            }}
                        />
                    )
                }

            </span>

            <span className="world-btn__label">
                {faction.name}
            </span>
        </>
    );


    // Si la facción ya tiene página, es un enlace; si no, un botón inerte.
    if(faction.route){
        return (
            <Link to={faction.route} className="world-btn">
                {content}
            </Link>
        );
    }

    return (
        <button className="world-btn" type="button">
            {content}
        </button>
    );

}


export default function Factions() {

    useDocumentTitle("Factions");


    return (

        <div>

            <h1 className="page-title">
                Factions
            </h1>


            <h2 className="worlds-heading">
                Main Factions
            </h2>

            <div className="worlds-row worlds-row--main">

                {
                    mainFactions.map(faction => (
                        <FactionButton key={faction.id} faction={faction} />
                    ))
                }

            </div>


            <hr className="section-divider" />


            <h2 className="worlds-heading">
                Other Dimensions
            </h2>

            <div className="worlds-row worlds-row--side">

                {
                    sideFactions.map(faction => (
                        <FactionButton key={faction.id} faction={faction} />
                    ))
                }

            </div>


        </div>

    );

}
