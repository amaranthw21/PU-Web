import { useParams } from "react-router-dom";
import transformations from "../../../data/lore/energy-powers/transformations";
import LoreDetail from "../../../components/LoreDetail";


export default function TransformationDetail(){

    const { id } = useParams();


    const transformation = transformations.find(
        transformation => transformation.id === id
    );


    return (

        <LoreDetail
            item={transformation}
            section={{ label: "Transformations", to: "/lore/energy-powers/transformations" }}
            notFound="Transformation type not found"
        />

    );

}
