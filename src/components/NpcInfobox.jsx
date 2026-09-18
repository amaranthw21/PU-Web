import InfoboxValue from "./InfoboxValue";
import asset from "../lib/asset";


// Basic Information de un NPC. Sigue al de los dioses —tabla de filas fijas más
// las que añada el mod—, con dos diferencias:
//
// Las fijas son cuatro y no una, porque de un personaje se pregunta siempre lo
// mismo: qué es, con quién va, de dónde es y a qué se dedica.
//
// Y lleva el retrato debajo del nombre, como el de los items: un dios se
// reconoce por su nombre, un personaje por su cara.
const ROWS = [
    { label: "Species",     key: "species" },
    { label: "Affiliation", key: "affiliation" },
    { label: "Country",     key: "country" },
    { label: "Role",        key: "role" }
];


export default function NpcInfobox({ npc }){

    // Filas extra que los mods añaden a mano. Solo se pintan las que tienen
    // etiqueta, para que una fila a medio rellenar no rompa la tabla.
    const extraRows = (npc.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {npc.name}
            </h2>

            {
                npc.image && (
                    <img
                        className="infobox__flag"
                        src={asset(npc.image)}
                        alt={npc.name}
                        style={{
                            objectPosition: npc.imagePosition || "center",
                            transform: npc.imageZoom ? `scale(${npc.imageZoom})` : undefined,
                            transformOrigin: npc.imagePosition || "center"
                        }}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                )
            }

            <table className="infobox__table">

                <tbody>

                    {
                        ROWS.map(row => (

                            <tr key={row.key}>

                                <th scope="row">
                                    {row.label}
                                </th>

                                <td>
                                    <InfoboxValue value={npc[row.key]} />
                                </td>

                            </tr>

                        ))
                    }

                    {
                        extraRows.map((row, i) => (

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
