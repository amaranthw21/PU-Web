import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import serverIcon from "../assets/IconServer-128.png";
import asset from "../lib/asset";


export default function Navbar(){

    const location = useLocation();

    // En móvil los enlaces viven en un panel desplegable. En escritorio el CSS
    // los muestra siempre, así que este estado se ignora a partir de 1000px.
    //
    // Lo que se guarda no es un booleano sino la ruta en la que se abrió el
    // panel: así "abierto" solo es cierto mientras se siga en esa página y el
    // menú se cierra solo al navegar, sin un efecto que lo vigile (también
    // cuando la navegación viene del botón de atrás del móvil).
    const [openedAt, setOpenedAt] = useState(null);

    const isOpen = openedAt === location.pathname;

    function setIsOpen(open){

        setOpenedAt(open ? location.pathname : null);

    }


    // Escape cierra el panel, como cualquier menú.
    useEffect(() => {

        if(!isOpen){

            return;

        }

        function onKeyDown(event){

            if(event.key === "Escape"){

                // Directamente el setter de useState (estable) en vez de
                // setIsOpen, que se recrea en cada render y obligaría a
                // resuscribir el listener continuamente.
                setOpenedAt(null);

            }

        }

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);

    }, [isOpen]);


    return (

        <nav className={isOpen ? "navbar navbar--open" : "navbar"}>


            <Link to="/" className="logo">

                <img
                    src={serverIcon}
                    alt="Server Icon"
                />

                <span>
                    RP Lore Archive
                </span>

            </Link>


            {/*
              Solo se ve en móvil (el CSS lo oculta en escritorio). Es un
              <button> de verdad para que funcione con teclado y lo anuncien
              los lectores de pantalla.
            */}
            <button
                type="button"
                className="nav-toggle"
                aria-expanded={isOpen}
                aria-controls="primary-nav"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen(open => !open)}
            >

                <span className="nav-toggle__bars" aria-hidden="true" />

            </button>


            {/*
              El cierre se delega en el contenedor para cubrir de una vez los
              siete enlaces. Hace falta además de la comprobación de ruta: al
              pulsar el enlace de la página en la que ya estás, la ruta no
              cambia y el panel se quedaría abierto.
            */}
            <div
                id="primary-nav"
                className={isOpen ? "links links--open" : "links"}
                onClick={() => setIsOpen(false)}
            >

                <Link to="/">
                    Home
                </Link>

                <Link to="/lore">
                    Lore
                </Link>

                <Link to="/worlds">
                    Worlds
                </Link>

                <Link to="/species">
                    Species
                </Link>

                <Link to="/factions">
                    Factions
                </Link>

                <Link to="/credits">
                    Credits
                </Link>

                {/*
                  El panel del CMS es un archivo estático en public/admin/, no una
                  ruta de React, así que va con <a> (navegación completa) y con
                  asset() para respetar el base path de GitHub Pages.

                  Se apunta a index.html explícitamente: en dev, Vite no resuelve
                  "/admin/" como directorio y lo captura el fallback del SPA.
                */}
                <a href={asset("/admin/index.html")} className="admin-link">
                    Admin
                </a>

            </div>


        </nav>

    );

}
