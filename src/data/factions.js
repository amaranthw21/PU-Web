// El contenido vive en src/content/factions/*.json (editable desde el CMS).
// Cada facción trae su `group` ("main" | "side"); aquí cargamos todos los
// JSON, les añadimos el id (= nombre del archivo) y su ruta, y los ordenamos.
const modules = import.meta.glob("../content/factions/*.json", { eager: true });

const factions = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, route: `/factions/${id}`, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


export const mainFactions = factions.filter(f => f.group === "main");
export const sideFactions = factions.filter(f => f.group === "side");
