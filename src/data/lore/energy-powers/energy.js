// El contenido vive en src/content/energy/*.json (editable desde el CMS).
const modules = import.meta.glob("../../../content/energy/*.json", { eager: true });

const energies = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default energies;
