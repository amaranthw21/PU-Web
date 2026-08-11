import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import species from "../data/species";
import Paragraphs from "../components/Paragraphs";
import asset from "../lib/asset";


export default function SpeciesDetail(){

    const { id } = useParams();


    const specie = species.find(
        specie => specie.id === id
    );


    // Mientras estás en la ficha de la especie, el fondo de la página es su
    // imagen (y su color de acento, si lo tiene). Al salir se restaura todo.
    useEffect(() => {

        if(!specie){
            return;
        }

        const body = document.body;
        const prevBg = body.style.backgroundImage;
        const prevAccent = body.style.getPropertyValue("--accent");

        if(specie.image){
            body.style.backgroundImage = `url(${asset(specie.image)})`;
        }

        if(specie.color){
            body.style.setProperty("--accent", specie.color);
        }

        return () => {
            body.style.backgroundImage = prevBg;

            if(prevAccent){
                body.style.setProperty("--accent", prevAccent);
            } else {
                body.style.removeProperty("--accent");
            }
        };

    }, [specie?.image, specie?.color]);


    if(!specie){

        return (
            <h1>
                Species not found
            </h1>
        );

    }


    return (

        <div className="entry-detail">

            <nav className="breadcrumb">
                <Link to="/species">Species</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current" style={{ color: "var(--accent)" }}>
                    {specie.name}
                </span>
            </nav>

            <h1 className="entry-detail__name">
                {specie.name}
            </h1>

            <Paragraphs text={specie.description} />

        </div>

    );

}
