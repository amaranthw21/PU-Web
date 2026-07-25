import { Link } from "react-router-dom";


export default function EnergyPowers(){

    return (

        <div>

            <h1>
                Important Items
            </h1>


            <Link to="/lore/items/legendarysets">
                <h2>
                    Legendary Sets
                </h2>
            </Link>


            <p>
                Information about the different legendary Sets.
            </p>



            <Link to="/lore/items/mysticalartifacts">
                <h2>
                    Mystical Artifacts and Gems
                </h2>
            </Link>
            <p>
                Information about the different Mystical Artifacts & Gems.
            </p>


            <Link to="/lore/items/fuelsources">
                <h2>
                    Fuel Sources
                </h2>
            </Link>


            <p>
                Information about Fuel Sources.
            </p>

            <Link to="/lore/items/technology">
                <h2>
                    Technology
                </h2>
            </Link>


            <p>
                Information about technological items
            </p>


        </div>

    );

}