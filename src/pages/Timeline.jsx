import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import timeline from "../data/lore/timeline";
import TimelineEra from "../components/TimelineEra";
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


export default function Timeline(){

    const eras = prepare(timeline);

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
                <span className="breadcrumb__current">Timeline</span>
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
            <div className="tl-bar">

                <p className="tl-bar__where">

                    <span className="tl-bar__dot" aria-hidden="true" />

                    {currentEra?.name ?? ""}

                </p>

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

        </div>

    );

}
