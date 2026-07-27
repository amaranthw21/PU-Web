// Categorías de dioses: controla el ORDEN y la ETIQUETA de cada grupo.
// El "id" es lo que va en el campo `category` de cada dios.
export const godCategories = [
    { id: "mobius",  label: "Gods of Mobius" },
    { id: "sol",     label: "Gods of Sol" },
    { id: "moebius", label: "Gods of Moebius" },
    { id: "other",   label: "Other Gods" }
];


// El contenido de cada dios vive en src/content/gods/*.json (editable desde
// el CMS). Aquí lo cargamos, le añadimos el id (= nombre del archivo) y lo
// ordenamos por el campo `order`.
const modules = import.meta.glob("../../../content/gods/*.json", { eager: true });

const gods = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default gods;
