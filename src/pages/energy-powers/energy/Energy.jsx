import { Link } from "react-router-dom";
import energies from "../../../data/lore/energy-powers/energy";


export default function Energy(){

    return (
        <div>

            <h1>
                Energy
            </h1>

            {
                energies.map(energy => (

                    <div key={energy.id}>

                        <Link to={`/lore/energy-powers/energy/${energy.id}`}>
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
