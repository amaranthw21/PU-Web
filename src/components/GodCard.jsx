import { useState } from "react";
import { Link } from "react-router-dom";
import asset from "../lib/asset";


export default function GodCard({ name, domain, image, imagePosition, imageZoom, link }) {

    // Si la imagen no existe / falla al cargar, caemos al placeholder magenta.
    const [imgError, setImgError] = useState(false);

    const showImage = image && !imgError;


    return (

        <Link
            to={link}
            className={showImage ? "god-card" : "god-card god-card--empty"}
        >

            {
                showImage
                    ? <img
                          className="god-card__img"
                          src={asset(image)}
                          alt={name}
                          onError={() => setImgError(true)}
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

                {
                    domain && (
                        <p>
                            {domain}
                        </p>
                    )
                }

            </div>

        </Link>

    );

}
