import { useParams } from "react-router-dom";
import transformations from "../../../data/lore/enery-powers/transformations";


export default function EnergyDetail(){

    const { id } = useParams();


    const transformation = transformations.find(
        transformation => transformation.id === id
    );


    if(!transformation){

        return (
            <h1>
                Transformation type not found
            </h1>
        );

    }


    return (

        <div>

            <h1>
                {transformation.name}
            </h1>


            <p>
                {transformation.description}
            </p>


        </div>

    );

}