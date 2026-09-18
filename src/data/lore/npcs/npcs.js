// Categorías de NPCs: controla el ORDEN y la ETIQUETA de cada grupo.
// El "id" es lo que va en el campo `category` de cada NPC.
//
// Son las mismas cuatro dimensiones que agrupan a los dioses: de un personaje
// del servidor se pregunta antes de dónde es que cualquier otra cosa.
export const npcCategories = [
    { id: "mobius",  label: "NPCs of Mobius" },
    { id: "sol",     label: "NPCs of Sol" },
    { id: "moebius", label: "NPCs of Moebius" },
    { id: "other",   label: "Other NPCs" }
];


// El contenido de cada NPC vive en src/content/npcs/*.json (editable desde el
// CMS). Aquí lo cargamos, le añadimos el id (= nombre del archivo) y lo
// ordenamos por el campo `order`.
const modules = import.meta.glob("../../../content/npcs/*.json", { eager: true });

const npcs = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default npcs;
