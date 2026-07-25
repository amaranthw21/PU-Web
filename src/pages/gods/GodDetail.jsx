import { useParams } from "react-router-dom";
import gods from "../../data/lore/gods/gods";


export default function GodDetail(){

    const { id } = useParams();


    const god = gods.find(
        god => god.id === id
    );


    if(!god){

        return <h1>God not found</h1>

    }


    return (

        <div>

            <h1>
                {god.name}
            </h1>

            <p>
                {god.description}
            </p>


        </div>

    )

}