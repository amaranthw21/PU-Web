import { useState } from "react";
import { Link } from "react-router-dom";
import asset from "../lib/asset";


export default function EntryCard({ name, subtitle, image, imagePosition, imageZoom, link }) {

    // Si la imagen no existe / falla al cargar, caemos al placeholder magenta.
    const [imgError, setImgError] = useState(false);

    const showImage = image && !imgError;


    return (

        <Link
            to={link}
            className={showImage ? "entry-card" : "entry-card entry-card--empty"}
        >

            {
                showImage
                    ? <img
                          className="entry-card__img"
                          src={asset(image)}
                          alt={name}
                          onError={() => setImgError(true)}
                          style={{
                              objectPosition: imagePosition || "center",
                              transform: imageZoom ? `scale(${imageZoom})` : undefined,
                              transformOrigin: imagePosition || "center"
                          }}
                      />
                    : <span className="entry-card__placeholder">
                          {name.charAt(0)}
                      </span>
            }


            <div className="entry-card__body">

                <h3>
                    {name}
                </h3>

                {
                    subtitle && (
                        <p>
                            {subtitle}
                        </p>
                    )
                }

            </div>

        </Link>

    );

}
