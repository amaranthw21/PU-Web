import { useParams } from "react-router-dom";
import energies from "../../../data/lore/energy-powers/energy";


export default function EnergyDetail(){

    const { id } = useParams();


    const energy = energies.find(
        energy => energy.id === id
    );


    if(!energy){

        return (
            <h1>
                Energy source not found
            </h1>
        );

    }


    return (

        <div>

            <h1>
                {energy.name}
            </h1>


            <p>
                {energy.description}
            </p>


        </div>

    );

}
