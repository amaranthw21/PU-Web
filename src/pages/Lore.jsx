import lore from "../data/lore/lore";
import EntryCard from "../components/EntryCard";
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
              Las mismas tarjetas con arte que Gods o Species, en vez de las
              cajas de texto que había: esta es la puerta de entrada al lore y
              cinco recuadros grises no invitan a entrar. La descripción de cada
              sección va de subtítulo, y sin imagen la tarjeta cae en el
              marcador con la inicial.
            */}
            <div className="grid card-grid card-grid--lore">

                {
                    lore.map(section => (

                        <EntryCard

                            key={section.id}

                            name={section.title}

                            subtitle={section.description}

                            image={section.image}

                            imagePosition={section.imagePosition}

                            imageZoom={section.imageZoom}

                            link={section.route}

                        />

                    ))
                }

            </div>

        </div>

    );

}
