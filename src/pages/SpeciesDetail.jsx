import { useParams } from "react-router-dom";
import species from "../data/species";


export default function SpeciesDetail(){

    const { id } = useParams();


    const specie = species.find(
        specie => specie.id === id
    );


    if(!specie){

        return (
            <h1>
                Species not found
            </h1>
        );

    }


    return (

        <div>

            <h1>
                {specie.name}
            </h1>


            <p>
                {specie.description}
            </p>


        </div>

    );

}
