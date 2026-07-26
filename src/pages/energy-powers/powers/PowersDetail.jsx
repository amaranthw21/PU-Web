import { useParams } from "react-router-dom";
import powers from "../../../data/lore/energy-powers/powers";


export default function PowersDetail(){

    const { id } = useParams();


    const power = powers.find(
        power => power.id === id
    );


    if(!power){

        return (
            <h1>
                Power type not found
            </h1>
        );

    }


    return (

        <div>

            <h1>
                {power.name}
            </h1>


            <p>
                {power.description}
            </p>


        </div>

    );

}
