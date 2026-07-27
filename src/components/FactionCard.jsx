import { Link } from "react-router-dom";
import asset from "../lib/asset";


export default function FactionCard({ faction }) {

    const content = (
        <>
            <div className="faction-card__icon">

                {
                    faction.image && (
                        <img
                            src={asset(faction.image)}
                            alt={faction.name}
                            onError={e => { e.currentTarget.style.display = "none"; }}
                        />
                    )
                }

            </div>

            <div className="faction-card__body">

                <h3>
                    {faction.name}
                </h3>

            </div>
        </>
    );


    // Si la facción ya tiene página, es un enlace; si no, una tarjeta inerte.
    if(faction.route){
        return (
            <Link to={faction.route} className="faction-card">
                {content}
            </Link>
        );
    }

    return (
        <div className="faction-card">
            {content}
        </div>
    );

}
