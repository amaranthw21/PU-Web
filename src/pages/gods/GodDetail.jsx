import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import gods from "../../data/lore/gods/gods";
import asset from "../../lib/asset";


export default function GodDetail(){

    const { id } = useParams();


    const god = gods.find(
        god => god.id === id
    );


    // Mientras estás en la ficha del dios, el fondo de la página es su imagen
    // y el color de acento (marco, nombre...) pasa a ser el suyo.
    // Al salir (o cambiar de dios) se restaura todo.
    useEffect(() => {

        if(!god){
            return;
        }

        const body = document.body;
        const prevBg = body.style.backgroundImage;
        const prevAccent = body.style.getPropertyValue("--accent");

        if(god.image){
            body.style.backgroundImage = `url(${asset(god.image)})`;
        }

        if(god.color){
            body.style.setProperty("--accent", god.color);
        }

        return () => {
            body.style.backgroundImage = prevBg;

            if(prevAccent){
                body.style.setProperty("--accent", prevAccent);
            } else {
                body.style.removeProperty("--accent");
            }
        };

    }, [god?.image, god?.color]);


    if(!god){

        return <h1>God not found</h1>

    }


    return (

        <div className="god-detail">

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/gods">Gods</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current" style={{ color: "var(--accent)" }}>
                    {god.name}
                </span>
            </nav>

            <h1 className="god-detail__name">
                {god.name}
            </h1>

            <p>
                {god.description}
            </p>


        </div>

    )

}
