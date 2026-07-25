import { Link } from "react-router-dom";
import gods from "../../data/lore/gods/gods";


export default function Gods(){

    return (

        <div>

            <h1>
                Gods
            </h1>


            {
                gods.map(god => (

                    <div key={god.id}>

                        <Link to={`/lore/gods/${god.id}`}>

                            <h2>
                                {god.name}
                            </h2>

                        </Link>

                        <p>
                            {god.domain}
                        </p>

                    </div>

                ))
            }


        </div>

    )

}