import InfoboxValue from "./InfoboxValue";
import asset from "../lib/asset";


// Las filas fijas del infobox de una especie, en el orden en que se muestran.
// Son el equivalente de las de una facción (ver FactionInfobox), pero con lo que
// define a una especie en vez de a un grupo. `key` es el campo del JSON.
// Los mods no pueden quitarlas ni reordenarlas: si una está vacía, sale "N/A".
const FIXED_ROWS = [
    { key: "origin",    label: "Origin" },
    { key: "habitat",   label: "Habitat" },
    { key: "lifespan",  label: "Lifespan" },
    { key: "traits",    label: "Notable traits" },
    { key: "abilities", label: "Abilities" }
];


export default function SpeciesInfobox({ specie }){

    // Filas extra que los mods añaden a mano. Solo se pintan las que tienen
    // etiqueta, para que una fila a medio rellenar no rompa la tabla.
    const extraRows = (specie.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {specie.name}
            </h2>

            {
                specie.image && (
                    <img
                        className="infobox__flag"
                        src={asset(specie.image)}
                        alt={specie.name}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                )
            }

            <table className="infobox__table">

                <tbody>

                    {
                        [...FIXED_ROWS.map(row => ({
                            label: row.label,
                            value: specie[row.key]
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
