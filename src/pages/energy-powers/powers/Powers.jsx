import { Link } from "react-router-dom";
import powers from "../../../data/lore/energy-powers/powers";


export default function Powers(){

    return (
        <div>

            <h1>
                Powers
            </h1>

            {
                powers.map(power => (

                    <div key={power.id}>

                        <Link to={`/lore/energy-powers/powers/${power.id}`}>
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
