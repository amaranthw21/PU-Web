import asset from "../lib/asset";


// Los heraldos son los seres que hablan por el dios. Cada uno es una imagen
// con su nombre debajo, y van en rejilla de dos por fila dentro del infobox.
// La imagen se puede recolocar con `imagePosition` y acercar con `imageZoom`,
// igual que la del propio dios.
function Harbingers({ harbingers }){

    return (

        <ul className="harbingers">

            {
                harbingers.map((harbinger, i) => (

                    <li key={i} className="harbinger">

                        <div className="harbinger__frame">

                            {
                                harbinger.image && (
                                    <img
                                        className="harbinger__img"
                                        src={asset(harbinger.image)}
                                        alt={harbinger.name ?? ""}
                                        style={{
                                            objectPosition: harbinger.imagePosition || "center",
                                            transform: harbinger.imageZoom ? `scale(${harbinger.imageZoom})` : undefined,
                                            transformOrigin: harbinger.imagePosition || "center"
                                        }}
                                        onError={e => { e.currentTarget.style.display = "none"; }}
                                    />
                                )
                            }

                        </div>

                        <span className="harbinger__name">
                            {harbinger.name}
                        </span>

                    </li>

                ))
            }

        </ul>

    );

}


export default function GodInfobox({ god }){

    // Filas extra que los mods añaden a mano. Solo se pintan las que tienen
    // etiqueta, para que una fila a medio rellenar no rompa la tabla.
    const extraRows = (god.extraInfo ?? []).filter(
        row => row?.label?.trim()
    );

    // Un heraldo sin nombre es una fila a medio rellenar en el CMS.
    const harbingers = (god.harbingers ?? []).filter(
        harbinger => harbinger?.name?.trim()
    );


    return (

        <aside className="infobox">

            <h2 className="infobox__title">
                {god.name}
            </h2>

            <table className="infobox__table">

                <tbody>

                    <tr>

                        <th scope="row">
                            Domain
                        </th>

                        <td>
                            {
                                god.domain?.trim()
                                    ? god.domain
                                    : <span className="infobox__na">N/A</span>
                            }
                        </td>

                    </tr>

                    {
                        extraRows.map((row, i) => (

                            <tr key={i}>

                                <th scope="row">
                                    {row.label}
                                </th>

                                <td>
                                    {
                                        row.value?.trim()
                                            ? row.value
                                            : <span className="infobox__na">N/A</span>
                                    }
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            {
                harbingers.length > 0 && (

                    <div className="infobox__section">

                        <h3 className="infobox__section-title">
                            Harbingers
                        </h3>

                        <Harbingers harbingers={harbingers} />

                    </div>

                )
            }

        </aside>

    );

}
