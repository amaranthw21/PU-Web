// El contenido vive en src/content/lore/*.json (editable desde el CMS).
const modules = import.meta.glob("../../content/lore/*.json", { eager: true });

const lore = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default lore;
