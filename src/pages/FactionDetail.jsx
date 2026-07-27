import { useParams } from "react-router-dom";
import { mainFactions, sideFactions } from "../data/factions";


export default function FactionDetail(){

    const { id } = useParams();


    const faction = [...mainFactions, ...sideFactions].find(
        faction => faction.id === id
    );


    if(!faction){

        return (
            <h1>
                Faction not found
            </h1>
        );

    }


    return (

        <div>

            <h1>
                {faction.name}
            </h1>


            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>


        </div>

    );

}
