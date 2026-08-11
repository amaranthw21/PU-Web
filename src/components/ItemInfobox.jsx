import InfoboxValue from "./InfoboxValue";
import asset from "../lib/asset";


// Basic Information de un item: el nombre, su imagen y las filas que se le
// pongan. Aquí no hay filas fijas —cada tipo de item necesita las suyas—, así
// que la tabla son solo las Extra rows.
export default function ItemInfobox({ item }){

    // Solo se pintan las filas con etiqueta, para que una fila a medio rellenar
    // en el CMS no rompa la tabla.
    const extraRows = (item.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {item.name}
            </h2>

            {
                item.image && (
                    <img
                        className="infobox__flag"
                        src={asset(item.image)}
                        alt={item.name}
                        style={{
                            objectPosition: item.imagePosition || "center",
                            transform: item.imageZoom ? `scale(${item.imageZoom})` : undefined,
                            transformOrigin: item.imagePosition || "center"
                        }}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                )
            }

            {
                extraRows.length > 0 && (

                    <table className="infobox__table">

                        <tbody>

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

                )
            }

        </aside>

    );

}
