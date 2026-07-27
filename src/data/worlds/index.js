// El contenido editable vive en:
//   - src/content/worlds/*.json       → mundos con página (texto, mapa, grupos)
//   - src/content/side-worlds/*.json  → dimensiones secundarias (solo botón)
//
// Los países de cada mundo son, POR AHORA, placeholders generados a partir de
// `placeholderLabel` y `count` de cada grupo. Cuando se escriban países reales
// se sustituirá esto por una colección propia ("Countries") en el CMS.
const worldModules = import.meta.glob("../../content/worlds/*.json", { eager: true });
const sideModules = import.meta.glob("../../content/side-worlds/*.json", { eager: true });


function buildCountries(worldId, groups) {
    return groups.flatMap(group =>
        Array.from({ length: group.count ?? 0 }, (_, i) => {
            const n = i + 1;
            return {
                id: `${group.id}-${n}`,
                name: `${group.placeholderLabel ?? group.label} ${n}`,
                flag: `/worlds/${worldId}/flags/${group.id}-${n}.png`,
                type: group.id
            };
        })
    );
}


const worlds = Object.entries(worldModules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        const data = mod.default ?? mod;
        return {
            id,
            ...data,
            countries: buildCountries(id, data.countryGroups ?? [])
        };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


// Mundos con página propia, indexados por su id (para WorldPage / CountryDetail).
export const worldsById = Object.fromEntries(
    worlds.map(world => [world.id, world])
);


// Botones de la página Worlds — fila principal (Main Hub).
export const mainWorlds = worlds.map(world => ({
    id: world.id,
    name: world.name,
    image: world.image,
    imagePosition: world.imagePosition,
    imageZoom: world.imageZoom,
    route: `/worlds/${world.id}`
}));


// Botones de la página Worlds — segunda fila (Side Dimensions).
export const otherWorlds = Object.entries(sideModules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
