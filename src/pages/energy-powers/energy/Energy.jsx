import { Link } from "react-router-dom";
import Accordion from "../../../components/Accordion";
import energies from "../../../data/lore/energy-powers/energy";
import useDocumentTitle from "../../../lib/useDocumentTitle";


export default function Energy(){

    useDocumentTitle("Energy");


    const canonEnergies = energies.filter(energy => !energy.custom);
    const customEnergies = energies.filter(energy => energy.custom);


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/energy-powers">Mechanics</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Energy</span>
            </nav>

            <h1 className="page-title">
                Energy
            </h1>


            <div className="accordion-list">

                {
                    canonEnergies.map(energy => (

                        <Accordion
                            key={energy.id}
                            title={energy.name}
                            summary={energy.summary}
                            icon={energy.icon}
                            background={energy.background}
                            backgroundPosition={energy.backgroundPosition}
                            backgroundZoom={energy.backgroundZoom}
                            link={`/lore/energy-powers/energy/${energy.id}`}
                        />

                    ))
                }

            </div>


            {
                customEnergies.length > 0 && (

                    <div className="accordion-list accordion-list--custom">

                        {
                            customEnergies.map(energy => (

                                <Accordion
                                    key={energy.id}
                                    title={energy.name}
                                    summary={energy.summary}
                                    icon={energy.icon}
                                    background={energy.background}
                                    backgroundPosition={energy.backgroundPosition}
                                    backgroundZoom={energy.backgroundZoom}
                                    link={`/lore/energy-powers/energy/${energy.id}`}
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
