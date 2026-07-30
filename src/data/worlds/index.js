// El contenido editable vive en:
//   - src/content/worlds/*.json       → mundos con página (texto, mapa, grupos)
//   - src/content/side-worlds/*.json  → dimensiones secundarias (solo botón)
//   - src/content/countries/*.json    → países escritos de verdad
const worldModules = import.meta.glob("../../content/worlds/*.json", { eager: true });
const sideModules = import.meta.glob("../../content/side-worlds/*.json", { eager: true });
const countryModules = import.meta.glob("../../content/countries/*.json", { eager: true });


// Países escritos de verdad. Cada uno declara a qué mundo (`world`) y a qué
// grupo (`group`) pertenece; el id es el nombre del archivo.
const writtenCountries = Object.entries(countryModules)
    .map(([path, mod]) => {
        const id = path.split("/").pop().replace(".json", "");
        return { id, ...(mod.default ?? mod) };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));


// La lista de países de un grupo = los escritos de verdad primero, y detrás
// placeholders hasta llegar a `count`. Es decir, los países reales OCUPAN plaza:
// `count` sigue siendo "cuántos países tiene este grupo en total", así que al
// escribir uno nuevo no hay que tocar el número.
function buildCountries(worldId, groups) {
    return groups.flatMap(group => {

        const written = writtenCountries
            .filter(country => country.world === worldId && country.group === group.id)
            .map(country => ({ ...country, type: group.id }));

        const remaining = Math.max(0, (group.count ?? 0) - written.length);

        const placeholders = Array.from({ length: remaining }, (_, i) => {
            const n = i + 1;
            return {
                id: `${group.id}-${n}`,
                name: `${group.placeholderLabel ?? group.label} ${n}`,
                flag: `/worlds/${worldId}/flags/${group.id}-${n}.png`,
                type: group.id
            };
        });

        return [...written, ...placeholders];

    });
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
