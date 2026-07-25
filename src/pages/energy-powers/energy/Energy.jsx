import { Link } from "react-router-dom";
import energies from "../../../data/lore/enery-powers/energy";


export default function Energy(){

    return (
        <div>

            <h1>
                Energy
            </h1>

            {
                energies.map(energy => (

                    <div key={energy.id}>

                        <Link to={`/lore/energy/${energy.id}`}>
                            <h2>
                                {energy.name}
                            </h2>
                        </Link>

                        <p>
                            {energy.description}
                        </p>

                    </div>

                ))
            }

        </div>
    );

}