import { Link } from "react-router-dom";
import energies from "../../../data/lore/enery-powers/transformations";
import transformations from "../../../data/lore/enery-powers/transformations";


export default function Power(){

    return (
        <div>

            <h1>
                Transformation
            </h1>

            {
                energies.map(transformations => (

                    <div key={transformations.id}>

                        <Link to={`/lore/power/${transformations.id}`}>
                            <h2>
                                {transformations.name}
                            </h2>
                        </Link>

                        <p>
                            {transformations.description}
                        </p>

                    </div>

                ))
            }

        </div>
    );

}