// El contenido vive en src/content/timeline/*.json (editable desde el CMS).
// Cada archivo es una era: un tramo de la línea con sus eventos dentro.
const modules = import.meta.glob("../../content/timeline/*.json", { eager: true });

const timeline = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default timeline;
