import { Link } from "react-router-dom";
import energies from "../../../data/lore/enery-powers/powers";


export default function Power(){

    return (
        <div>

            <h1>
                Powers
            </h1>

            {
                energies.map(power => (

                    <div key={power.id}>

                        <Link to={`/lore/power/${power.id}`}>
                            <h2>
                                {power.name}
                            </h2>
                        </Link>

                        <p>
                            {power.description}
                        </p>

                    </div>

                ))
            }

        </div>
    );

}