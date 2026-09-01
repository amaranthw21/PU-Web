import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import timeline from "../data/lore/timeline";
import { mainWorlds } from "../data/worlds/index";
import TimelineEra from "../components/TimelineEra";
import NotFound from "./NotFound";
import asset from "../lib/asset";
import slug from "../lib/slug";


// Prepara lo que la página va a pintar: el ancla de cada era y de cada evento
// (para poder enlazar uno suelto), y de qué lado cae cada tarjeta.
//
// La alternancia cuenta solo los eventos: si contara también los saltos y los
// rótulos, el ritmo izquierda-derecha se rompería cada vez que se mete uno.
function prepare(eras){

    const used = new Set();

    function anchor(text, fallback){

        const base = slug(text) || fallback;
        let id = base;
        let n = 2;

        while(used.has(id)){
            id = `${base}-${n}`;
            n += 1;
        }

        used.add(id);

        return id;

    }


    return eras
        .filter(era => era.name?.trim())
        .map((era, eraIndex) => {

            let events = 0;

            return {
                ...era,
                id: anchor(era.name, `era-${eraIndex}`),
                items: (era.items ?? []).map((item, i) => {

                    if(item.type && item.type !== "event"){
                        return item;
                    }

                    const flip = events % 2 === 1;
                    events += 1;

                    return {
                        ...item,
                        flip,
                        id: anchor(item.title, `event-${eraIndex}-${i}`)
                    };

                })
            };

        });

}


// Cada dimensión tiene su propia línea. Las pestañas salen de los mundos que
// tienen alguna era escrita: al crear la primera era de un mundo desde el panel,
// su pestaña aparece sola.
function timelinesOf(eras){

    return mainWorlds
        .filter(world => eras.some(era => era.world === world.id))
        .map(world => ({ id: world.id, name: world.name }));

}


export default function Timeline(){

    const { world } = useParams();

    const timelines = timelinesOf(timeline);

    // Sin mundo en la dirección se abre el primero. Con uno que no tiene línea,
    // mejor decirlo que enseñar una página vacía sin explicación.
    const currentWorld = world ?? timelines[0]?.id;

    const known = timelines.some(item => item.id === currentWorld);

    const eras = prepare(timeline.filter(era => era.world === currentWorld));

    // Los lanzamientos de juegos y cómics son otra cronología metida en la
    // misma: se pueden apagar para leer solo la historia del mundo.
    const [showReleases, setShowReleases] = useState(true);

    // El modo compacto deja solo fechas y títulos: toda la historia de un
    // vistazo, que es lo que un póster hace bien y una página larga pierde.
    const [compact, setCompact] = useState(false);

    // En qué era estás. Lo dice la barra de arriba, y además manda sobre el
    // fondo de la página.
    const [current, setCurrent] = useState(eras[0]?.id ?? null);

    const boardRef = useRef(null);
    const menuRef = useRef(null);


    // El fondo y el color de acento van siguiendo a la era por la que vas
    // pasando, igual que hacen las fichas con su entrada. Al salir se restaura
    // lo que hubiera.
    useEffect(() => {

        const sections = boardRef.current?.querySelectorAll(".tl-era");

        if(!sections?.length){
            return;
        }

        const spy = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){
                        setCurrent(entry.target.id);
                    }

                });

            },

            // La franja del medio de la pantalla: la era "actual" es la que
            // tienes delante, no la que asoma por abajo.
            { rootMargin: "-45% 0px -45% 0px" }

        );

        sections.forEach(section => spy.observe(section));

        return () => spy.disconnect();

    }, []);


    useEffect(() => {

        const era = eras.find(item => item.id === current);

        if(!era){
            return;
        }

        const body = document.body;
        const prevBg = body.style.getPropertyValue("--page-bg");
        const prevAccent = body.style.getPropertyValue("--accent");

        if(era.background?.trim()){
            body.style.setProperty("--page-bg", `url(${asset(era.background)})`);
        }

        if(era.color?.trim()){
            body.style.setProperty("--accent", era.color);
        }

        return () => {

            if(prevBg){
                body.style.setProperty("--page-bg", prevBg);
            } else {
                body.style.removeProperty("--page-bg");
            }

            if(prevAccent){
                body.style.setProperty("--accent", prevAccent);
            } else {
                body.style.removeProperty("--accent");
            }

        };

    }, [current, eras]);


    // Después de los hooks a propósito: saltárselos en un render rompería el
    // orden que React necesita.
    if(!known){

        return <NotFound title="Timeline not found" />;

    }


    const currentEra = eras.find(era => era.id === current);

    const boardClasses = ["tl-board"];

    if(!showReleases){
        boardClasses.push("tl-board--no-releases");
    }

    if(compact){
        boardClasses.push("tl-board--compact");
    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/timeline">Timeline</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">
                    {timelines.find(item => item.id === currentWorld)?.name}
                </span>
            </nav>

            <h1 className="page-title">
                Timeline
            </h1>

            <p className="page-intro">
                One line, from the first age to the present. Scroll to travel it:
                the gaps are as long as the time they cover, and every event can be
                linked on its own.
            </p>


            {/*
              La barra se queda arriba mientras bajas: dice en qué era estás —lo
              que un póster te da de un vistazo y una página larga pierde— y
              lleva los dos interruptores.
            */}
            {/*
              Qué línea estás leyendo va en su propia barra y arriba del todo:
              es una decisión de página, no un control de lectura, y se toma una
              vez al entrar. Por eso tampoco se queda pegada al bajar.

              Son enlaces, no botones: el mundo va en la dirección, así que se
              puede enlazar un evento de una línea concreta y el botón de atrás
              funciona.
            */}
            <nav className="tl-worlds" aria-label="Timelines">

                {
                    timelines.map(item => (

                        <NavLink
                            key={item.id}
                            to={`/lore/timeline/${item.id}`}
                            className={item.id === currentWorld ? "tl-world tl-world--on" : "tl-world"}
                        >
                            {item.name}
                        </NavLink>

                    ))
                }

            </nav>


            <div className="tl-bar">

                {/*
                  En qué era estás y, a la vez, la manera de saltar a otra. Es
                  un <details> con enlaces dentro: cada era ya tiene su ancla,
                  así que saltar es seguir un enlace —se puede copiar, abrir en
                  otra pestaña y el atrás funciona— en vez de mover el scroll a
                  mano.
                */}
                <details className="tl-eras" ref={menuRef}>

                    <summary className="tl-eras__current">

                        <span className="tl-bar__dot" aria-hidden="true" />

                        {currentEra?.name ?? "Eras"}

                        <svg
                            className="tl-eras__arrow"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path d="M6 9.5l6 6 6-6" />
                        </svg>

                    </summary>

                    <ul className="tl-eras__list">

                        {
                            eras.map(era => (

                                <li key={era.id}>

                                    <a
                                        className={
                                            era.id === current
                                                ? "tl-eras__item tl-eras__item--on"
                                                : "tl-eras__item"
                                        }
                                        href={`#${era.id}`}
                                        onClick={() => { menuRef.current.open = false; }}
                                    >
                                        {era.name}
                                    </a>

                                </li>

                            ))
                        }

                    </ul>

                </details>

                <button
                    type="button"
                    className="tl-switch"
                    aria-pressed={showReleases}
                    onClick={() => setShowReleases(on => !on)}
                >
                    <span className="tl-switch__box" aria-hidden="true" />
                    Game releases
                </button>

                <button
                    type="button"
                    className="tl-switch"
                    aria-pressed={compact}
                    onClick={() => setCompact(on => !on)}
                >
                    <span className="tl-switch__box" aria-hidden="true" />
                    Compact
                </button>

            </div>


            <div className={boardClasses.join(" ")} ref={boardRef}>

                {
                    eras.map(era => (

                        <TimelineEra key={era.id} era={era} />

                    ))
                }

            </div>

            {
                eras.every(era => (era.items ?? []).length === 0) && (

                    <p className="tl-empty">
                        This timeline has no events yet. They are added era by era
                        from the editing panel.
                    </p>

                )
            }

        </div>

    );

}
