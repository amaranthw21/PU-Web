import { Link } from "react-router-dom";
import serverIcon from "../assets/IconServer-128.png";
import asset from "../lib/asset";


// La barra superior. Las secciones del sitio viven en la barra lateral
// (Sidebar); aquí solo quedan el logo y los dos accesos que no son una sección:
// el buscador y el panel de edición.
//
// El estado del menú de móvil lo lleva Layout, porque el panel que abre este
// botón es la propia barra lateral.
export default function Navbar({ menuOpen, onToggleMenu }){

    return (

        <nav className={menuOpen ? "navbar navbar--open" : "navbar"}>


            <Link to="/" className="logo">

                <img
                    src={serverIcon}
                    alt="Server Icon"
                />

                <span>
                    RP Lore Archive
                </span>

            </Link>


            <div className="navbar__actions">

                {/*
                  El icono se explica solo, y en la barra el ancho es un recurso
                  escaso, así que el nombre accesible lo pone el aria-label.
                */}
                <Link to="/search" className="search-link" aria-label="Search">

                    <svg
                        className="search-link__icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>

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

                {/*
                  Abre la barra lateral en móvil. En escritorio el rail está
                  siempre a la vista, así que el CSS lo esconde. Es un <button>
                  de verdad para que funcione con teclado y lo anuncien los
                  lectores de pantalla.
                */}
                <button
                    type="button"
                    className="nav-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="primary-nav"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={onToggleMenu}
                >

                    <span className="nav-toggle__bars" aria-hidden="true" />

                </button>

            </div>


        </nav>

    );

}
