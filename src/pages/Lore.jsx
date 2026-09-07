import lore from "../data/lore/lore";
import Card from "../components/Card";
import useDocumentTitle from "../lib/useDocumentTitle";


export default function Lore(){

    useDocumentTitle("Lore");


    return (

        <div>

            <h1 className="page-title">
                Lore
            </h1>

            <p className="page-intro">
                Everything the setting is made of. Pick a shelf.
            </p>


            {/*
              Las cajas de texto de siempre, pero con el arte de cada sección
              entrando por la derecha y desvaneciéndose. Así el texto manda —es
              una página índice— y la página deja de ser cinco recuadros grises.
            */}
            <div className="grid card-grid--lore">

                {
                    lore.map(section => (

                        <Card

                            key={section.id}

                            title={section.title}

                            description={section.description}

                            image={section.image}

                            imagePosition={section.imagePosition}

                            link={section.route}

                        />

                    ))
                }

            </div>

        </div>

    );

}
