import { useState } from "react";
import Paragraphs from "./Paragraphs";
import asset from "../lib/asset";


// Una zona del carrusel: imagen + nombre. Solo es pulsable si tiene
// descripción; si no, no hay nada que desplegar y se pinta como una tarjeta
// normal (así no se ofrece un clic que no hace nada).
function Location({ location, isOpen, onToggle }){

    const canExpand = Boolean(location.description?.trim());

    const inner = (

        <>
            {
                location.image
                    ? <img
                          className="region-loc__img"
                          src={asset(location.image)}
                          alt={location.name ?? ""}
                          onError={e => { e.currentTarget.style.visibility = "hidden"; }}
                      />
                    : <span className="region-loc__img region-loc__img--empty" />
            }

            <span className="region-loc__name">
                {location.name}
            </span>
        </>

    );


    if(!canExpand){

        return (
            <div className="region-loc">
                {inner}
            </div>
        );

    }


    return (

        <button
            type="button"
            className={isOpen ? "region-loc region-loc--open" : "region-loc"}
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            {inner}
        </button>

    );

}


function Region({ region }){

    // Qué zona está desplegada. null = ninguna.
    const [openIndex, setOpenIndex] = useState(null);

    // Se descartan las zonas vacías del todo (fila a medio rellenar en el CMS).
    const locations = (region.locations ?? []).filter(
        location => location?.name?.trim() || location?.image?.trim()
    );

    const open = openIndex === null ? null : locations[openIndex];


    return (

        <div className="region">

            {
                region.title && (
                    <h3 className="region__title">
                        {region.title}
                    </h3>
                )
            }

            <Paragraphs text={region.description} className="region__desc" />

            {
                locations.length > 0 && (

                    <>
                        {/* El carrusel scrollea dentro de sí mismo, así que la
                            página nunca se desplaza en horizontal. */}
                        <div className="region__carousel">

                            {
                                locations.map((location, i) => (

                                    <Location
                                        key={i}
                                        location={location}
                                        isOpen={openIndex === i}
                                        onToggle={() => setOpenIndex(
                                            openIndex === i ? null : i
                                        )}
                                    />

                                ))
                            }

                        </div>

                        {
                            open && (

                                <div className="region__panel">

                                    <h4 className="region__panel-title">
                                        {open.name}
                                    </h4>

                                    <Paragraphs
                                        text={open.description}
                                        className="region__panel-text"
                                    />

                                </div>

                            )
                        }
                    </>

                )
            }

        </div>

    );

}


export default function CountryRegions({ part }){

    const regions = (part.regions ?? []).filter(
        region => region?.title?.trim() || (region?.locations ?? []).length > 0
    );


    return (

        <div className="regions">

            {
                part.map?.trim() && (

                    <figure className="block-figure regions__map">

                        <img
                            src={asset(part.map)}
                            alt={part.mapCaption ?? "Map"}
                            onError={e => { e.currentTarget.closest("figure").style.display = "none"; }}
                        />

                        {
                            part.mapCaption && (
                                <figcaption>
                                    {part.mapCaption}
                                </figcaption>
                            )
                        }

                    </figure>

                )
            }

            {
                regions.map((region, i) => (

                    <Region key={i} region={region} />

                ))
            }

        </div>

    );

}
