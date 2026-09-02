import Paragraphs from "./Paragraphs";
import CountryRegions from "./CountryRegions";
import asset from "../lib/asset";


// Los párrafos de un bloque llevan siempre la misma clase.
//
// El título es opcional: es lo que convierte una parte en un apartado con
// nombre ("Innate Powers:") en vez de un párrafo suelto. Va en h3 porque el
// bloque que lo contiene ya usa un h2.
function BlockText({ title, text }){

    return (

        <>

            {
                title?.trim() && (

                    <h3 className="block-part__title">
                        {title}
                    </h3>

                )
            }

            <Paragraphs text={text} className="country-block__text" />

        </>

    );

}


function BlockImage({ image, caption }){

    return (

        <figure className="block-figure">

            <img
                src={asset(image)}
                loading="lazy"
                alt={caption ?? ""}
                onError={e => { e.currentTarget.closest("figure").style.display = "none"; }}
            />

            {
                caption && (
                    <figcaption>
                        {caption}
                    </figcaption>
                )
            }

        </figure>

    );

}


// Cada parte del bloque se pinta según su tipo. El tipo lo escribe el CMS en la
// clave `type` al elegir "Text", "Text + image" o "Image".
function BlockPart({ part }){

    if(part.type === "text"){

        return <BlockText title={part.title} text={part.text} />;

    }


    if(part.type === "image"){

        if(!part.image?.trim()){
            return null;
        }

        return <BlockImage image={part.image} caption={part.caption} />;

    }


    if(part.type === "regions"){

        return <CountryRegions part={part} />;

    }


    // El último apartado de una facción es el equivalente del de regiones de un
    // país, pero con grupos de personajes en lugar de zonas con lugares. Se
    // pinta igual (carrusel + panel que se abre), así que se traduce la forma y
    // se reutiliza el mismo componente.
    if(part.type === "characters"){

        return (
            <CountryRegions
                part={{
                    map: part.image,
                    mapCaption: part.caption,
                    regions: (part.groups ?? []).map(group => ({
                        title: group.title,
                        description: group.description,
                        locations: group.characters
                    }))
                }}
            />
        );

    }


    if(part.type === "textImage"){

        // Sin imagen se comporta como una parte de solo texto, para que una
        // parte a medio rellenar no deje un hueco raro.
        if(!part.image?.trim()){
            return <BlockText title={part.title} text={part.text} />;
        }

        const side = part.imageSide === "left" ? "left" : "right";

        return (

            <div className={`block-split block-split--${side}`}>

                {/*
                  El título va dentro de la columna de texto, no encima de las
                  dos: así la imagen queda al lado del apartado completo, título
                  incluido.
                */}
                <div className="block-split__text">
                    <BlockText title={part.title} text={part.text} />
                </div>

                <BlockImage image={part.image} caption={part.caption} />

            </div>

        );

    }


    return null;

}


// Un bloque de contenido: título con icono y una lista de partes. Lo usan tanto
// las fichas de país como las de energía.
export default function ContentBlock({ block }){

    const parts = block.parts ?? [];


    return (

        <section className="country-block" id={block.id}>

            <header className="block-title">

                {
                    block.icon
                        ? <img
                              className="block-title__icon"
                              src={asset(block.icon)}
                              alt=""
                              onError={e => { e.currentTarget.style.visibility = "hidden"; }}
                          />
                        : <span className="block-title__icon block-title__icon--empty" />
                }

                <h2 className="block-title__text">
                    {block.title}
                </h2>

            </header>

            {
                parts.map((part, i) => (

                    <BlockPart key={i} part={part} />

                ))
            }

        </section>

    );

}
