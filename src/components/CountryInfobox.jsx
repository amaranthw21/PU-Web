import asset from "../lib/asset";


// Las filas fijas del infobox, en el orden en que se muestran. `key` es el
// campo del JSON del país. Los mods no pueden quitarlas ni reordenarlas: si
// una está vacía, sale "N/A".
const FIXED_ROWS = [
    { key: "continent",          label: "Continent" },
    { key: "capital",            label: "Capital" },
    { key: "otherCities",        label: "Other Cities" },
    { key: "majorOrganizations", label: "Major Organizations" },
    { key: "minorOrganizations", label: "Minor Organizations" }
];


// Un campo puede ser un texto suelto o una lista (Other Cities y las
// organizaciones son listas). Se normaliza a array para pintar una línea por
// valor, y si no queda nada se muestra "N/A".
function InfoboxValue({ value }){

    const items = (Array.isArray(value) ? value : [value])
        .filter(item => typeof item === "string" && item.trim() !== "");

    if(items.length === 0){

        return <span className="infobox__na">N/A</span>;

    }

    return items.map((item, i) => (

        <span key={i} className="infobox__line">
            {item}
        </span>

    ));

}


export default function CountryInfobox({ country }){

    // Filas extra que los mods añaden a mano. Solo se pintan las que tienen
    // etiqueta, para que una fila a medio rellenar no rompa la tabla.
    const extraRows = (country.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {country.name}
            </h2>

            {
                country.flag && (
                    <img
                        className="infobox__flag"
                        src={asset(country.flag)}
                        alt={`Flag of ${country.name}`}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                )
            }

            <table className="infobox__table">

                <tbody>

                    {
                        [...FIXED_ROWS.map(row => ({
                            label: row.label,
                            value: country[row.key]
                        })), ...extraRows].map((row, i) => (

                            <tr key={i}>

                                <th scope="row">
                                    {row.label}
                                </th>

                                <td>
                                    <InfoboxValue value={row.value} />
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </aside>

    );

}
