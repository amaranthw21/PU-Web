import { Link } from "react-router-dom";
import serverIcon from "../assets/IconServer.png";
import asset from "../lib/asset";


export default function Navbar(){

    return (

        <nav className="navbar">


            <Link to="/" className="logo">

                <img 
                    src={serverIcon}
                    alt="Server Icon"
                />

                <span>
                    RP Lore Archive
                </span>

            </Link>


            <div className="links">

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