import { useParams } from "react-router-dom";
import powers from "../../../data/lore/energy-powers/powers";
import LoreDetail from "../../../components/LoreDetail";


export default function PowersDetail(){

    const { id } = useParams();


    const power = powers.find(
        power => power.id === id
    );


    return (

        <LoreDetail
            item={power}
            section={{ label: "Powers", to: "/lore/energy-powers/powers" }}
            notFound="Power type not found"
        />

    );

}
