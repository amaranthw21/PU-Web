import Card from "../components/Card";
import lore from "../data/lore/lore";


export default function Lore(){


    return (

        <>

            <h1>
                Lore
            </h1>


            <div className="grid">

                {
                    lore.map(section => (

                        <Card

                            key={section.id}

                            title={section.title}

                            description={section.description}

                            link={section.route}

                        />

                    ))
                }

            </div>


        </>

    );

}
