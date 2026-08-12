import { Link, useParams } from "react-router-dom";
import { worldsById } from "../../data/worlds";
import CountryCard from "../../components/CountryCard";
import Paragraphs from "../../components/Paragraphs";
import asset from "../../lib/asset";
import NotFound from "../NotFound";


export default function WorldPage(){

    const { worldId } = useParams();

    const world = worldsById[worldId];


    if(!world){

        return <NotFound title="World not found" />;

    }


    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/worlds">Worlds</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">{world.name}</span>
            </nav>

            <h1 className="page-title">
                {world.name}
            </h1>


            {/* El recuadro es uno solo; dentro van los párrafos. */}
            <div className="world-presentation">
                <Paragraphs text={world.presentation} />
            </div>


            <img
                className="world-map"
                src={asset(world.map)}
                alt={`Map of ${world.name}`}
            />


            <hr className="section-divider" />


            {
                world.countryGroups.map(group => {

                    const groupCountries = world.countries.filter(
                        country => country.type === group.id
                    );

                    if(groupCountries.length === 0 && !group.description){
                        return null;
                    }


                    return (

                        <section key={group.id} className="category-section">

                            <h2 className="worlds-heading">
                                {group.label}
                            </h2>

                            {
                                group.description && (
                                    <Paragraphs text={group.description} className="world-group-desc" />
                                )
                            }

                            {
                                groupCountries.length > 0 && (

                                    <div className="grid card-grid">

                                        {
                                            groupCountries.map(country => (

                                                <CountryCard
                                                    key={country.id}
                                                    country={country}
                                                    link={`/worlds/${world.id}/${country.id}`}
                                                />

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </section>

                    );

                })
            }


            <hr className="section-divider" />


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
