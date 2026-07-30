// Pinta un texto del CMS como párrafos: se separan por una línea en blanco.
// Lo usan los bloques de la ficha de país y las regiones.
export default function Paragraphs({ text, className }){

    return (text ?? "")
        .split(/\n\s*\n/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, i) => (

            <p key={i} className={className}>
                {paragraph}
            </p>

        ));

}
