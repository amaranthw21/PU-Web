import { Link } from "react-router-dom";
import entryLink from "../lib/entryLink";


// Las fichas con las que tiene que ver una entrada, pintadas como etiquetas
// enlazadas. Lo usan los eventos de la cronología y las crónicas del servidor.
//
// Las que no se resuelven —una entrada renombrada o borrada— no se pintan: un
// enlace roto es peor que ninguno.
export default function RelatedEntries({ related }){

    const links = (related ?? [])
        .map(item => entryLink(item.section, item.id))
        .filter(Boolean);

    if(links.length === 0){

        return null;

    }


    return (

        <div className="entry-chips">

            {
                links.map(link => (

                    <Link key={link.route} className="entry-chip" to={link.route}>
                        {link.name}
                    </Link>

                ))
            }

        </div>

    );

}
