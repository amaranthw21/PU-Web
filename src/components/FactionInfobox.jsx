import InfoboxValue from "./InfoboxValue";
import asset from "../lib/asset";


// Las filas fijas del infobox de una facción, en el orden en que se muestran.
// Son el equivalente de las de un país (ver CountryInfobox), pero con lo que
// define a una facción en vez de a un territorio. `key` es el campo del JSON.
// Los mods no pueden quitarlas ni reordenarlas: si una está vacía, sale "N/A".
const FIXED_ROWS = [
    { key: "leader",       label: "Leader" },
    { key: "headquarters", label: "Headquarters" },
    { key: "bases",        label: "Territory / Bases" },
    { key: "allies",       label: "Allies" },
    { key: "enemies",      label: "Enemies" }
];


export default function FactionInfobox({ faction }){

    // Filas extra que los mods añaden a mano. Solo se pintan las que tienen
    // etiqueta, para que una fila a medio rellenar no rompa la tabla.
    const extraRows = (faction.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {faction.name}
            </h2>

            {
                faction.image && (
                    <img
                        className="infobox__flag"
                        src={asset(faction.image)}
                        alt={`Emblem of ${faction.name}`}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                )
            }

            <table className="infobox__table">

                <tbody>

                    {
                        [...FIXED_ROWS.map(row => ({
                            label: row.label,
                            value: faction[row.key]
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
