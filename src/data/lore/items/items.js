// Categorías de items: controla el ORDEN y la ETIQUETA de cada grupo.
// El "id" es lo que va en el campo `category` de cada item.
export const itemCategories = [
    { id: "legendary-sets",    label: "Legendary Sets" },
    { id: "gems",              label: "Power/Magical Gems" },
    { id: "magical-artifacts", label: "Magical Artifacts" },
    { id: "technology",        label: "Technology" },
    { id: "custom",            label: "Custom Items" }
];


// El contenido de cada item vive en src/content/items/*.json (editable desde
// el CMS). Aquí lo cargamos, le añadimos el id (= nombre del archivo) y lo
// ordenamos por el campo `order`.
const modules = import.meta.glob("../../../content/items/*.json", { eager: true });

const items = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default items;
