import { useParams } from "react-router-dom";
import energies from "../../../data/lore/energy-powers/energy";
import LoreDetail from "../../../components/LoreDetail";


export default function EnergyDetail(){

    const { id } = useParams();


    const energy = energies.find(
        energy => energy.id === id
    );


    return (

        <LoreDetail
            item={energy}
            section={{ label: "Energy", to: "/lore/energy-powers/energy" }}
            notFound="Energy source not found"
        />

    );

}
