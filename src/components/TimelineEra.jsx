import { Link } from "react-router-dom";
import asset from "../lib/asset";
import entryLink from "../lib/entryLink";
import Paragraphs from "./Paragraphs";


// Los personajes que salen en un evento, en fila y solapados.
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


// Enlaces a las fichas que tienen que ver con el evento. Los que no se resuelven
// (una entrada borrada o renombrada) no se pintan: un enlace roto es peor que
// ninguno.
function Related({ related }){

    const links = (related ?? [])
        .map(item => entryLink(item.section, item.id))
        .filter(Boolean);

    if(links.length === 0){

        return null;

    }


    return (

        <div className="tl-chips">

            {
                links.map(link => (

                    <Link key={link.route} className="tl-chip" to={link.route}>
                        {link.name}
                    </Link>

                ))
            }

        </div>

    );

}


function Event({ item }){

    const classes = ["tl-row"];

    classes.push(item.flip ? "tl-row--right" : "tl-row--left");

    if(item.layer === "release"){
        classes.push("tl-row--release");
    }


    return (

        <li className={classes.join(" ")}>

            <span className="tl-node" aria-hidden="true" />

            <article className="tl-card" id={item.id}>

                <Portraits portraits={item.portraits} />

                {
                    item.image?.trim() && (

                        <img
                            className="tl-card__cover"
                            src={asset(item.image)}
                            alt=""
                            loading="lazy"
                            onError={e => { e.currentTarget.style.display = "none"; }}
                        />

                    )
                }

                <h3 className="tl-card__title">

                    {item.title}

                    {/*
                      Enlace a este evento concreto, para pegarlo en el Discord.
                      Solo se ve al pasar por encima o al llegar con el teclado.
                    */}
                    <a
                        className="tl-card__anchor"
                        href={`#${item.id}`}
                        aria-label={`Link to “${item.title}”`}
                    >
                        #
                    </a>

                </h3>

                {
                    item.text?.trim() && (
                        <Paragraphs text={item.text} className="tl-card__text" />
                    )
                }

                <Related related={item.related} />

            </article>

            {
                item.date?.trim() && (

                    <span className={item.year ? "tl-when tl-when--year" : "tl-when"}>
                        {item.date}
                    </span>

                )
            }

        </li>

    );

}


// Una era: un tramo con nombre de la línea, no un cuadro aparte. El color y el
// arte de la era los aplica la página al fondo según vas bajando.
export default function TimelineEra({ era }){

    return (

        <section
            className="tl-era"
            id={era.id}
            data-era={era.id}
            style={era.color ? { "--era": era.color } : undefined}
        >

            <header className="tl-era__head">

                <h2 className="tl-era__name">
                    {era.name}
                </h2>

                {
                    era.artist?.trim() && (

                        <p className="tl-era__credit">

                            Art by{" "}

                            {
                                era.artistUrl?.trim()
                                    ? <a href={era.artistUrl} target="_blank" rel="noreferrer">{era.artist}</a>
                                    : era.artist
                            }

                        </p>

                    )
                }

            </header>


            <ol className="tl-line">

                {
                    (era.items ?? []).map((item, i) => {

                        if(item.type === "gap"){

                            return (
                                <li key={i} className="tl-gap">
                                    <span className="tl-gap__label">{item.text}</span>
                                </li>
                            );

                        }

                        if(item.type === "label"){

                            return (
                                <li key={i} className="tl-band">
                                    <span className="tl-band__label">{item.text}</span>
                                </li>
                            );

                        }

                        if(item.type === "year"){

                            return (
                                <li key={i} className="tl-mark">
                                    <span className="tl-mark__label">{item.text}</span>
                                </li>
                            );

                        }

                        return <Event key={i} item={item} />;

                    })
                }

            </ol>

        </section>

    );

}
