import { Link } from "react-router-dom";
import Accordion from "../../../components/Accordion";
import transformations from "../../../data/lore/energy-powers/transformations";


export default function Transformation(){

    const canonTransformations = transformations.filter(t => !t.custom);
    const customTransformations = transformations.filter(t => t.custom);


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/energy-powers">Mechanics</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Transformations</span>
            </nav>

            <h1 className="page-title">
                Transformations
            </h1>


            <div className="accordion-list">

                {
                    canonTransformations.map(transformation => (

                        <Accordion
                            key={transformation.id}
                            title={transformation.name}
                            summary={transformation.summary}
                            icon={transformation.icon}
                            background={transformation.background}
                            backgroundPosition={transformation.backgroundPosition}
                            backgroundZoom={transformation.backgroundZoom}
                            link={`/lore/energy-powers/transformations/${transformation.id}`}
                        />

                    ))
                }

            </div>


            {
                customTransformations.length > 0 && (

                    <div className="accordion-list accordion-list--custom">

                        {
                            customTransformations.map(transformation => (

                                <Accordion
                                    key={transformation.id}
                                    title={transformation.name}
                                    summary={transformation.summary}
                                    icon={transformation.icon}
                                    background={transformation.background}
                                    backgroundPosition={transformation.backgroundPosition}
                                    backgroundZoom={transformation.backgroundZoom}
                                    link={`/lore/energy-powers/transformations/${transformation.id}`}
                                    custom
                                />

                            ))
                        }

                    </div>

                )
            }


            <section className="faq">

                <h2>
                    FAQ
                </h2>

                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </h3>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>

            </section>


        </div>

    );

}
