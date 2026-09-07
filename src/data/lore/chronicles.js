// El contenido vive en src/content/chronicles/*.json (editable desde el CMS).
// Cada archivo es una crónica: una tarjeta en /lore/chronicles y su propia
// página en /lore/chronicles/<id>.
const modules = import.meta.glob("../../content/chronicles/*.json", { eager: true });

const chronicles = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default chronicles;
