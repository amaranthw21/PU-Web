import Card from "../../components/Card";
import rules from "../../data/rules/rules";
import useDocumentTitle from "../../lib/useDocumentTitle";


// Índice del rulesbook: una tarjeta por capítulo, en el orden que marque su
// campo `order`. Misma estructura que la página Lore, porque es lo mismo: un
// índice de secciones que viven en el CMS.
export default function Rulesbook(){

    useDocumentTitle("Rulesbook");



    return (

        <>

            <h1>
                Rulesbook
            </h1>

            <p className="page-intro">
                The rules of the server, all in one place. Every chapter has its
                own page, and each section inside it has its own link — so a
                moderator can point straight at the rule in question.
            </p>


            <div className="grid">

                {
                    rules.map(chapter => (

                        <Card

                            key={chapter.id}

                            title={chapter.name}

                            description={chapter.summary}

                            link={`/rulesbook/${chapter.id}`}

                        />

                    ))
                }

            </div>


        </>

    );

}
