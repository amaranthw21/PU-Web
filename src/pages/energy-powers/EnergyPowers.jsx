import { Link } from "react-router-dom";


export default function EnergyPowers(){

    return (

        <div>

            <h1>
                Energy & Powers
            </h1>


            <Link to="/lore/energy-powers/energy">
                <h2>
                    Energy
                </h2>
            </Link>


            <p>
                Information about the different energy sources.
            </p>



            <Link to="/lore/energy-powers/powers">
                <h2>
                    Powers
                </h2>
            </Link>


            <Link to="/lore/energy-powers/transformations">
                <h2>
                    Transfomations
                </h2>
            </Link>


            <p>
                Information about transfomations.
            </p>


        </div>

    );

}