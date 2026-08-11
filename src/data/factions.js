// El contenido vive en:
//   - src/content/factions/*.json        → hubs (una dimensión, solo el botón y sus grupos)
//   - src/content/faction-entries/*.json → facciones escritas de verdad, con ficha propia
//
// Cada hub trae su `group` ("main" | "side"); aquí cargamos todos los JSON, les
// añadimos el id (= nombre del archivo) y su ruta, y los ordenamos.
//
// Cada hub tiene además `factionGroups` (Main / Side / Custom) con un `count`
// de facciones — igual que los `countryGroups` de los mundos.
const modules = import.meta.glob("../content/factions/*.json", { eager: true });
const entryModules = import.meta.glob("../content/faction-entries/*.json", { eager: true });


// Facciones escritas de verdad. Cada una declara a qué hub (`faction`) y a qué
// grupo (`group`) pertenece; el id es el nombre del archivo.
const writtenFactions = Object.entries(entryModules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


// La lista de facciones de un grupo = las escritas de verdad primero, y detrás
// placeholders hasta llegar a `count`, igual que los países de un mundo: las
// facciones reales OCUPAN plaza, así que al escribir una nueva no hay que tocar
// el número. Las "main" reutilizan las imágenes main-1..main-N de la carpeta del
// hub; las de "side"/"custom" usan `placeholderImage`.
function buildSubFactions(factionId, faction) {
    const folder = faction.imageFolder;

    return (faction.factionGroups ?? []).flatMap(group => {

        const written = writtenFactions
            .filter(entry => entry.faction === factionId && entry.group === group.id)
            .map(entry => ({
                ...entry,
                type: group.id,
                route: `/factions/${factionId}/${entry.id}`
            }));

        const remaining = Math.max(0, (group.count ?? 0) - written.length);

        const placeholders = Array.from({ length: remaining }, (_, i) => {
            const n = i + 1;
            const id = `${group.id}-${n}`;

            const image = group.id === "main" && folder
                ? `/factions/${folder}/main-${n}.png`
                : faction.placeholderImage;

            return {
                id,
                name: `${group.placeholderLabel ?? group.label} ${n}`,
                image,
                type: group.id,
                route: `/factions/${factionId}/${id}`
            };
        });

        return [...written, ...placeholders];

    });
}


const factions = Object.entries(modules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        const data = mod.default ?? mod;
        return {
            id,
            route: `/factions/${id}`,
            ...data,
            subFactions: buildSubFactions(id, data)
        };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


// Facciones indexadas por id (para la página de detalle FactionDetail).
export const factionsById = Object.fromEntries(
    factions.map(faction => [faction.id, faction])
);


export const mainFactions = factions.filter(f => f.group === "main");
export const sideFactions = factions.filter(f => f.group === "side");
