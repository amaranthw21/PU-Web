import { Link, useSearchParams } from "react-router-dom";
import search, { normalize, snippetFor } from "../lib/search";


// Parte el texto en trozos y marca los que coinciden con lo buscado, para que se
// vea de un vistazo por qué ha salido ese resultado. Se compara sobre el texto
// normalizado (sin acentos ni mayúsculas) pero se pinta el original.
function Highlight({ text, query }){

    if(!query){
        return text;
    }

    const haystack = normalize(text);
    const needle = normalize(query);

    const out = [];
    let from = 0;

    for(;;){

        const at = haystack.indexOf(needle, from);

        if(at < 0){
            break;
        }

        if(at > from){
            out.push(text.slice(from, at));
        }

        out.push(
            <mark key={at} className="search-hit">
                {text.slice(at, at + needle.length)}
            </mark>
        );

        from = at + needle.length;

    }

    out.push(text.slice(from));

    return out;

}


export default function Search(){

    // La consulta vive en la URL (?q=), no en el estado del componente: así el
    // resultado de una búsqueda se puede compartir o guardar, y atrás y adelante
    // funcionan como espera cualquiera.
    const [params, setParams] = useSearchParams();

    const query = params.get("q") ?? "";

    const results = search(query);

    const tooShort = query.trim().length === 1;


    function onChange(event){

        const value = event.target.value;

        // replace y no push: si cada tecla dejara una entrada en el historial,
        // volver atrás obligaría a deshacer la búsqueda letra a letra.
        setParams(value ? { q: value } : {}, { replace: true });

    }


    return (

        <div>

            <h1 className="page-title">
                Search
            </h1>

            <form className="search-form" role="search" onSubmit={e => e.preventDefault()}>

                <label className="search-form__label" htmlFor="search-input">
                    Search the archive
                </label>

                <input
                    id="search-input"
                    className="search-form__input"
                    type="search"
                    value={query}
                    onChange={onChange}
                    placeholder="Gods, worlds, factions, species…"
                    autoComplete="off"
                    autoFocus
                />

            </form>


            {
                query.trim() === "" && (

                    <p className="search-empty">
                        Type to search across every entry in the archive — gods, worlds,
                        countries, factions, species, items, energies and powers.
                    </p>

                )
            }

            {
                tooShort && (

                    <p className="search-empty">
                        Keep typing — searches need at least two letters.
                    </p>

                )
            }

            {
                query.trim().length >= 2 && (

                    <>

                        <p className="search-count">
                            {
                                results.length === 0
                                    ? `Nothing matches “${query}”.`
                                    : `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`
                            }
                        </p>

                        <ol className="search-results">

                            {
                                results.map(result => (

                                    <li key={result.id} className="search-result">

                                        <Link className="search-result__link" to={result.href}>

                                            <span className="search-result__head">

                                                <span className="search-result__title">
                                                    <Highlight text={result.title} query={query} />
                                                </span>

                                                <span className="search-result__type">
                                                    {result.typeLabel}
                                                </span>

                                            </span>

                                            {
                                                result.section && (

                                                    <span className="search-result__section">
                                                        in “{result.section.title}”
                                                    </span>

                                                )
                                            }

                                            <span className="search-result__snippet">
                                                <Highlight text={snippetFor(result, normalize(query))} query={query} />
                                            </span>

                                        </Link>

                                    </li>

                                ))
                            }

                        </ol>

                    </>

                )
            }

        </div>

    );

}
