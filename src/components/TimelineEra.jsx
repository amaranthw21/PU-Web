import asset from "../lib/asset";
import Paragraphs from "./Paragraphs";


// Retratos circulares encima de un evento: los personajes que aparecen en él.
// Se solapan un poco, como en la versión dibujada a mano.
function Portraits({ portraits }){

    if(!portraits?.length){

        return null;

    }


    return (

        <div className="tl-portraits">

            {
                portraits.map((portrait, i) => (

                    <img
                        key={i}
                        className="tl-portraits__img"
                        src={asset(portrait.image)}
                        alt={portrait.name ?? ""}
                        title={portrait.name ?? undefined}
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />

                ))
            }

        </div>

    );

}


// Un evento: la caja de texto o la portada, sus retratos y el tallo que lo une
// a la línea. `side` decide si cuelga por arriba o por abajo; el tallo lo pinta
// el CSS, que es quien sabe dónde está la línea.
function Event({ item }){

    return (

        <div className={`tl-item tl-item--${item.side === "below" ? "below" : "above"}`}>

            <Portraits portraits={item.portraits} />

            {
                item.image?.trim() && (

                    <img
                        className="tl-item__cover"
                        src={asset(item.image)}
                        alt={item.title ?? ""}
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />

                )
            }

            {
                item.title?.trim() && (

                    <div className="tl-card" id={item.id}>

                        <h3 className="tl-card__title">
                            {item.title}
                        </h3>

                        {
                            item.text?.trim() && (
                                <Paragraphs text={item.text} className="tl-card__text" />
                            )
                        }

                    </div>

                )
            }

        </div>

    );

}


// Lo que va sobre la propia línea, sin colgar de ella: el año en azul, el hueco
// de tiempo entre dos eventos y el rótulo ancho que separa continuidades.
function SpineItem({ item }){

    if(item.type === "year"){

        return (
            <span className="tl-spine tl-spine--year">
                {item.text}
            </span>
        );

    }

    if(item.type === "label"){

        return (
            <span className="tl-spine tl-spine--label">
                {item.text}
            </span>
        );

    }

    return (
        <span className="tl-spine tl-spine--note">
            {item.text}
        </span>
    );

}


// Una era: su banda, con el arte de fondo, el rótulo, el crédito del artista y
// la línea con todo lo que cuelga de ella.
//
// `direction: "rtl"` invierte el recorrido, como en la versión dibujada: las
// bandas alternan de sentido y la siguiente empieza donde acabó la anterior.
export default function TimelineEra({ era }){

    const items = era.items ?? [];

    const classes = [
        "tl-era",
        `tl-era--name-${era.namePosition === "right" ? "right" : "left"}`
    ];


    return (

        <section className={classes.join(" ")} id={era.id}>

            {
                era.background?.trim() && (

                    <div
                        className="tl-era__art"
                        style={{ backgroundImage: `url(${asset(era.background)})` }}
                    />

                )
            }

            <header className="tl-era__head">

                <h2 className="tl-era__name">
                    {era.name}
                </h2>

                {
                    era.artist?.trim() && (

                        <p className="tl-era__credit">

                            Art By:{" "}

                            {
                                era.artistUrl?.trim()
                                    ? <a href={era.artistUrl} target="_blank" rel="noreferrer">{era.artist}</a>
                                    : era.artist
                            }

                        </p>

                    )
                }

            </header>


            {/*
              La banda se recorre de lado cuando no cabe. Es scroll propio, no de
              la página: cada era se mueve por su cuenta, igual que la imagen que
              había que arrastrar.
            */}
            <div className={era.direction === "rtl" ? "tl-era__track tl-era__track--rtl" : "tl-era__track"}>

                <ol
                    className="tl-rail"
                    style={{ "--tl-cols": items.length }}
                >

                    {
                        items.map((item, i) => (

                            <li
                                key={i}
                                /* Su columna, explícita. Dejar que la rejilla
                                   las reparta sola no vale: con flujo por
                                   columnas apila arriba, línea y abajo en la
                                   misma, y el orden del CMS se pierde. */
                                style={{ gridColumn: i + 1 }}
                                className={
                                    item.type === "event" || !item.type
                                        ? `tl-slot tl-slot--${item.side === "below" ? "below" : "above"}`
                                        : "tl-slot tl-slot--spine"
                                }
                            >

                                {
                                    item.type === "event" || !item.type
                                        ? <Event item={item} />
                                        : <SpineItem item={item} />
                                }

                            </li>

                        ))
                    }

                </ol>

            </div>

        </section>

    );

}
