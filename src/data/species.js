// El contenido vive en src/content/species/*.json (editable desde el CMS).
// Aquí solo lo cargamos, le añadimos el id (= nombre del archivo) y lo
// ordenamos por el campo `order`.
const modules = import.meta.glob("../content/species/*.json", { eager: true });

const species = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


// Especies normales vs. "companion only" (más pequeñas, en su propia sección).
// Las que no declaran `group` se consideran principales.
export const mainSpecies = species.filter(s => (s.group ?? "main") === "main");
export const companionSpecies = species.filter(s => s.group === "companion");


export default species;
