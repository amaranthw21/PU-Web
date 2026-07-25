import { useParams } from "react-router-dom";
import powers from "../../../data/lore/enery-powers/powers";


export default function EnergyDetail(){

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
                {powers.name}
            </h1>


            <p>
                {powers.description}
            </p>


        </div>

    );

}