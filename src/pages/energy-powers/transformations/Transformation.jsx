import { Link } from "react-router-dom";
import transformations from "../../../data/lore/energy-powers/transformations";


export default function Transformation(){

    return (
        <div>

            <h1>
                Transformation
            </h1>

            {
                transformations.map(transformation => (

                    <div key={transformation.id}>

                        <Link to={`/lore/energy-powers/transformations/${transformation.id}`}>
                            <h2>
                                {transformation.name}
                            </h2>
                        </Link>

                        <p>
                            {transformation.description}
                        </p>

                    </div>

                ))
            }

        </div>
    );

}
