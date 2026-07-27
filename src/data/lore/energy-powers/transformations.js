// El contenido vive en src/content/transformations/*.json (editable desde el
// CMS). Aquí lo cargamos, le añadimos el id (= nombre del archivo) y lo
// ordenamos por el campo `order`.
const modules = import.meta.glob("../../../content/transformations/*.json", { eager: true });

const transformations = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export default transformations;
