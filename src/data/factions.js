// El contenido vive en src/content/factions/*.json (editable desde el CMS).
// Cada facción trae su `group` ("main" | "side"); aquí cargamos todos los
// JSON, les añadimos el id (= nombre del archivo) y su ruta, y los ordenamos.
//
// Cada dimensión tiene además `factionGroups` (Main / Side / Custom) con un
// `count` de placeholders — igual que los `countryGroups` de los mundos. Las
// entradas "main" usan sus imágenes reales (main-1..main-N de la carpeta de la
// dimensión); las de "side"/"custom" son placeholders que reutilizan
// `placeholderImage` POR AHORA, hasta que se escriba contenido real.
const modules = import.meta.glob("../content/factions/*.json", { eager: true });


function buildSubFactions(factionId, faction) {
    const folder = faction.imageFolder;

    return (faction.factionGroups ?? []).flatMap(group =>
        Array.from({ length: group.count ?? 0 }, (_, i) => {
            const n = i + 1;
            const id = `${group.id}-${n}`;

            // Las "main" tienen imagen propia; el resto son placeholders.
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
        })
    );
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
