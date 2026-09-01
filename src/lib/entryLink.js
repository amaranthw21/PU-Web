// Resuelve un enlace a otra ficha del archivo a partir de la sección y el id.
//
// Lo usa la cronología: un evento declara con qué entradas tiene que ver
// (`related`) y aquí se traduce a nombre + ruta. Se lee el contenido en crudo,
// como hace el buscador, en vez de pasar por los módulos de src/data: así vale
// para todas las secciones sin depender de la forma de cada uno.
const SECTIONS = {
    gods: {
        modules: import.meta.glob("../content/gods/*.json", { eager: true }),
        route: id => `/lore/gods/${id}`
    },
    items: {
        modules: import.meta.glob("../content/items/*.json", { eager: true }),
        route: id => `/lore/items/${id}`
    },
    species: {
        modules: import.meta.glob("../content/species/*.json", { eager: true }),
        route: id => `/species/${id}`
    },
    energy: {
        modules: import.meta.glob("../content/energy/*.json", { eager: true }),
        route: id => `/lore/energy-powers/energy/${id}`
    },
    powers: {
        modules: import.meta.glob("../content/powers/*.json", { eager: true }),
        route: id => `/lore/energy-powers/powers/${id}`
    },
    transformations: {
        modules: import.meta.glob("../content/transformations/*.json", { eager: true }),
        route: id => `/lore/energy-powers/transformations/${id}`
    },
    worlds: {
        modules: import.meta.glob("../content/worlds/*.json", { eager: true }),
        route: id => `/worlds/${id}`
    },
    factions: {
        modules: import.meta.glob("../content/factions/*.json", { eager: true }),
        route: id => `/factions/${id}`
    },
    countries: {
        modules: import.meta.glob("../content/countries/*.json", { eager: true }),
        // Un país cuelga de su mundo; sin ese dato no hay dirección válida.
        route: (id, entry) => entry.world ? `/worlds/${entry.world}/${id}` : null
    }
};


function entriesOf(section){

    return Object.fromEntries(
        Object.entries(section.modules).map(([path, mod]) => [
            path.split("/").pop().replace(".json", ""),
            mod.default ?? mod
        ])
    );

}


// Devuelve { name, route } o null. Null cuando la sección no existe, cuando la
// entrada se ha borrado o renombrado, o cuando no tiene página: el que pinta
// decide qué hacer, y la cronología simplemente no enseña ese enlace. Un enlace
// roto es peor que ninguno.
export default function entryLink(section, id){

    const found = SECTIONS[section];

    if(!found || !id){

        return null;

    }

    const entry = entriesOf(found)[id];

    if(!entry){

        return null;

    }

    const route = found.route(id, entry);

    if(!route){

        return null;

    }

    return { name: entry.name ?? entry.title ?? id, route };

}


export const LINK_SECTIONS = Object.keys(SECTIONS);
