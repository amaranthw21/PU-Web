import { Link } from "react-router-dom";
import home from "../data/home";
import chronicles from "../data/lore/chronicles";
import Card from "../components/Card";
import EntryCard from "../components/EntryCard";
import Paragraphs from "../components/Paragraphs";
import useDocumentTitle from "../lib/useDocumentTitle";
import asset from "../lib/asset";


// Cuántas crónicas caben en la portada sin que se convierta en un listado: las
// demás están en su propia página.
const CHRONICLES = 3;


// Los enlaces se agrupan por su etiqueta de grupo, respetando el orden en que
// están escritos: los que no tienen grupo van primero y sin rótulo, que suelen
// ser los importantes. Ocho enlaces mezclados de golpe se leen como un montón.
function byGroup(links){

    const groups = [];

    (links ?? [])
        .filter(link => link.label?.trim() && link.url?.trim())
        .forEach(link => {

            const name = link.group?.trim() ?? "";
            const open = groups.find(group => group.name === name);

            if(open){
                open.links.push(link);
            } else {
                groups.push({ name, links: [link] });
            }

        });

    return groups;

}


// Un enlace de la lista. Interno (empieza por /) o externo, y en ese caso abre
// en otra pestaña.
function HomeLink({ link }){

    const external = !link.url.startsWith("/");


    return (

        <a
            className="home-link"
            href={link.url}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >

            <span className="home-link__label">

                {link.label}

                {external && <span className="home-link__out" aria-hidden="true">↗</span>}

            </span>

            {
                link.description?.trim() && (

                    <span className="home-link__text">
                        {link.description}
                    </span>

                )
            }

        </a>

    );

}


export default function Home(){

    // Sin texto: la pestaña se queda con el nombre del sitio, que en la
    // portada es lo correcto.
    useDocumentTitle();

    const featured = home.showChronicles
        ? chronicles.slice(0, CHRONICLES)
        : [];

    const linkGroups = byGroup(home.links);


    return (

        <div>

            {/*
              La cabecera: qué es esto, para quien entra por primera vez. El
              arte va de fondo con la misma idea que las tarjetas de Lore —el
              degradado por encima—, así que el texto se lee siempre.
            */}
            <section
                className={home.image?.trim() ? "home-hero home-hero--art" : "home-hero"}
                style={
                    home.image?.trim()
                        ? { "--home-art": `url(${asset(home.image)})` }
                        : undefined
                }
            >

                <h1 className="home-hero__title">
                    {home.greeting}
                </h1>

                {
                    home.intro?.trim() && (

                        <div className="home-hero__text">
                            <Paragraphs text={home.intro} />
                        </div>

                    )
                }

                {
                    home.discordUrl?.trim() && (

                        <a
                            className="home-hero__cta"
                            href={home.discordUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {home.discordLabel?.trim() || "Join the Discord"}
                        </a>

                    )
                }

            </section>


            {
                home.startHere?.length > 0 && (

                    <section className="home-section">

                        <h2 className="worlds-heading">
                            Start here
                        </h2>

                        <div className="grid card-grid--lore">

                            {
                                home.startHere.map(item => (

                                    <Card

                                        key={item.route ?? item.title}

                                        title={item.title}

                                        description={item.description}

                                        image={item.image}

                                        imagePosition={item.imagePosition}

                                        link={item.route}

                                    />

                                ))
                            }

                        </div>

                    </section>

                )
            }


            {
                featured.length > 0 && (

                    <section className="home-section">

                        <h2 className="worlds-heading">
                            {home.chroniclesTitle?.trim() || "Latest chronicles"}
                        </h2>

                        <div className="grid card-grid">

                            {
                                featured.map(chronicle => (

                                    <EntryCard

                                        key={chronicle.id}

                                        name={chronicle.name}

                                        subtitle={chronicle.date || chronicle.summary}

                                        image={chronicle.image}

                                        imagePosition={chronicle.imagePosition}

                                        imageZoom={chronicle.imageZoom}

                                        link={`/lore/chronicles/${chronicle.id}`}

                                    />

                                ))
                            }

                        </div>

                        <p className="home-more">
                            <Link to="/lore/chronicles">
                                All chronicles →
                            </Link>
                        </p>

                    </section>

                )
            }

            {
                linkGroups.length > 0 && (

                    <section className="home-section">

                        <h2 className="worlds-heading">
                            {home.linksTitle?.trim() || "Links"}
                        </h2>

                        {
                            linkGroups.map(group => (

                                <div key={group.name || "main"} className="home-links">

                                    {
                                        group.name && (

                                            <h3 className="home-links__group">
                                                {group.name}
                                            </h3>

                                        )
                                    }

                                    <div className="home-links__grid">

                                        {
                                            group.links.map(link => (

                                                <HomeLink key={link.url} link={link} />

                                            ))
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </section>

                )
            }

        </div>

    );

}
