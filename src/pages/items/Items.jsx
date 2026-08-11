import { Link } from "react-router-dom";
import EntryCard from "../../components/EntryCard";
import items, { itemCategories } from "../../data/lore/items/items";


export default function Items(){

    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Important Items</span>
            </nav>

            <h1 className="page-title">
                Important Items
            </h1>

            <p className="page-intro">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>


            <hr className="section-divider" />


            {
                itemCategories.map(category => {

                    const itemsInCategory = items.filter(
                        item => item.category === category.id
                    );

                    // Si un grupo no tiene items todavía, no lo mostramos.
                    if(itemsInCategory.length === 0){
                        return null;
                    }


                    return (

                        <section key={category.id} className="category-section">

                            <h2>
                                {category.label}
                            </h2>


                            <div className="grid card-grid">

                                {
                                    itemsInCategory.map(item => (

                                        <EntryCard

                                            key={item.id}

                                            name={item.name}

                                            subtitle={item.summary}

                                            image={item.image}

                                            imagePosition={item.imagePosition}

                                            imageZoom={item.imageZoom}

                                            link={`/lore/items/${item.id}`}

                                        />

                                    ))
                                }

                            </div>

                        </section>

                    );

                })
            }


            <hr className="section-divider" />


            <section className="faq faq--after-divider">

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
