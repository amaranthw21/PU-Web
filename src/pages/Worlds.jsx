import { Link } from "react-router-dom";
import { mainWorlds, otherWorlds } from "../data/worlds";


function WorldButton({ world }) {

    const content = (
        <>
            <span className="world-btn__circle">

                {
                    world.image && (
                        <span
                            className="world-btn__img"
                            style={{
                                backgroundImage: `url(${world.image})`,
                                backgroundPosition: world.imagePosition || "center",
                                transform: world.imageZoom ? `scale(${world.imageZoom})` : undefined,
                                transformOrigin: world.imagePosition || "center"
                            }}
                        />
                    )
                }

            </span>

            <span className="world-btn__label">
                {world.name}
            </span>
        </>
    );


    // Si el mundo ya tiene página, es un enlace; si no, un botón inerte.
    if(world.route){
        return (
            <Link to={world.route} className="world-btn">
                {content}
            </Link>
        );
    }

    return (
        <button className="world-btn" type="button">
            {content}
        </button>
    );

}


// Divide un array en filas de como máximo `size` elementos.
function chunk(items, size) {
    const rows = [];
    for(let i = 0; i < items.length; i += size){
        rows.push(items.slice(i, i + size));
    }
    return rows;
}


export default function Worlds() {

    return (

        <div>

            <h1 className="page-title">
                Worlds
            </h1>


            <h2 className="worlds-heading">
                Main Hub
            </h2>

            <div className="worlds-row worlds-row--main">

                {
                    mainWorlds.map(world => (
                        <WorldButton key={world.id} world={world} />
                    ))
                }

            </div>


            <hr className="section-divider" />


            <h2 className="worlds-heading">
                Side Dimensions
            </h2>

            {
                chunk(otherWorlds, 5).map((row, index) => (

                    <div className="worlds-row worlds-row--side" key={index}>

                        {
                            row.map(world => (
                                <WorldButton key={world.id} world={world} />
                            ))
                        }

                    </div>

                ))
            }


        </div>

    );

}
