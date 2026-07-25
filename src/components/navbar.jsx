import { Link } from "react-router-dom";
import serverIcon from "../assets/IconServer.png";


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

            </div>


        </nav>

    );

}