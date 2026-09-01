import { Link } from "react-router-dom";
import Accordion from "../../../components/Accordion";
import powers from "../../../data/lore/energy-powers/powers";
import useDocumentTitle from "../../../lib/useDocumentTitle";


export default function Powers(){

    useDocumentTitle("Powers");


    const canonPowers = powers.filter(power => !power.custom);
    const customPowers = powers.filter(power => power.custom);


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <Link to="/lore/energy-powers">Mechanics</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Powers</span>
            </nav>

            <h1 className="page-title">
                Powers
            </h1>


            <div className="accordion-list">

                {
                    canonPowers.map(power => (

                        <Accordion
                            key={power.id}
                            title={power.name}
                            summary={power.summary}
                            icon={power.icon}
                            background={power.background}
                            backgroundPosition={power.backgroundPosition}
                            backgroundZoom={power.backgroundZoom}
                            link={`/lore/energy-powers/powers/${power.id}`}
                        />

                    ))
                }

            </div>


            {/* Los poderes de jugador van aparte, debajo de los canon. */}
            {
                customPowers.length > 0 && (

                    <div className="accordion-list accordion-list--custom">

                        {
                            customPowers.map(power => (

                                <Accordion
                                    key={power.id}
                                    title={power.name}
                                    summary={power.summary}
                                    icon={power.icon}
                                    background={power.background}
                                    backgroundPosition={power.backgroundPosition}
                                    backgroundZoom={power.backgroundZoom}
                                    link={`/lore/energy-powers/powers/${power.id}`}
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
