import { Link } from "react-router-dom";
import asset from "../lib/asset";


export default function GodCard({ name, domain, image, imagePosition, imageZoom, link }) {

    return (

        <Link
            to={link}
            className={image ? "god-card" : "god-card god-card--empty"}
        >

            {
                image
                    ? <img
                          className="god-card__img"
                          src={asset(image)}
                          alt={name}
                          style={{
                              objectPosition: imagePosition || "center",
                              transform: imageZoom ? `scale(${imageZoom})` : undefined,
                              transformOrigin: imagePosition || "center"
                          }}
                      />
                    : <span className="god-card__placeholder">
                          {name.charAt(0)}
                      </span>
            }


            <div className="god-card__body">

                <h3>
                    {name}
                </h3>

                <p>
                    {domain}
                </p>

            </div>

        </Link>

    );

}
