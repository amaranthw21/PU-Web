// El contenido vive en src/content/rules/*.json (editable desde el CMS). Cada
// archivo es un capítulo del rulesbook: una tarjeta en /rulesbook y su propia
// página en /rulesbook/<id>.
const modules = import.meta.glob("../../content/rules/*.json", { eager: true });

const rules = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default rules;
