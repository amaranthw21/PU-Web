import { useParams } from "react-router-dom";
import chronicles from "../../data/lore/chronicles";
import LoreDetail from "../../components/LoreDetail";
import usePageAccent from "../../lib/usePageAccent";


export default function ChronicleDetail(){

    const { id } = useParams();


    const chronicle = chronicles.find(
        chronicle => chronicle.id === id
    );


    // Como en las fichas de dioses e items: mientras la lees, el fondo y el
    // color de la página son los suyos.
    usePageAccent(chronicle?.background, chronicle?.color);


    return (

        <LoreDetail
            item={chronicle}
            trail={[
                { label: "Server Chronicles", to: "/lore/chronicles" }
            ]}
            meta={chronicle?.date}
            related={chronicle?.related}
            notFound="Chronicle not found"
        />

    );

}
