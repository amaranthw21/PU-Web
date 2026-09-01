import slug from "./slug";


// ─────────────────────────── El índice ───────────────────────────
//
// El buscador lee directamente los JSON de src/content, no los módulos de
// src/data. Es a propósito: worlds y factions fabrican entradas de relleno
// ("Main Faction 1", "Safe Area 2") para completar los grupos hasta su `count`,
// y esas páginas están vacías. Leyendo el contenido en crudo se indexa solo lo
// que un mod ha escrito de verdad.
//
// Los glob son los mismos archivos que ya carga src/data, así que Vite reutiliza
// los módulos: el índice no añade nada al peso de la descarga.
const COLLECTIONS = [
    {
        type: "species",
        label: "Species",
        modules: import.meta.glob("../content/species/*.json", { eager: true }),
        route: (id) => `/species/${id}`
    },
    {
        type: "world",
        label: "Worlds",
        modules: import.meta.glob("../content/worlds/*.json", { eager: true }),
        route: (id) => `/worlds/${id}`
    },
    {
        type: "country",
        label: "Countries",
        modules: import.meta.glob("../content/countries/*.json", { eager: true }),
        // Cada país declara a qué mundo pertenece; sin eso no hay ruta válida.
        route: (id, entry) => entry.world ? `/worlds/${entry.world}/${id}` : null
    },
    {
        type: "faction-hub",
        label: "Faction hubs",
        modules: import.meta.glob("../content/factions/*.json", { eager: true }),
        route: (id) => `/factions/${id}`
    },
    {
        type: "faction",
        label: "Factions",
        modules: import.meta.glob("../content/faction-entries/*.json", { eager: true }),
        route: (id, entry) => entry.faction ? `/factions/${entry.faction}/${id}` : null
    },
    {
        type: "god",
        label: "Gods",
        modules: import.meta.glob("../content/gods/*.json", { eager: true }),
        route: (id) => `/lore/gods/${id}`
    },
    {
        type: "item",
        label: "Items",
        modules: import.meta.glob("../content/items/*.json", { eager: true }),
        route: (id) => `/lore/items/${id}`
    },
    {
        type: "energy",
        label: "Energies",
        modules: import.meta.glob("../content/energy/*.json", { eager: true }),
        route: (id) => `/lore/energy-powers/energy/${id}`
    },
    {
        type: "power",
        label: "Powers",
        modules: import.meta.glob("../content/powers/*.json", { eager: true }),
        route: (id) => `/lore/energy-powers/powers/${id}`
    },
    {
        type: "transformation",
        label: "Transformations",
        modules: import.meta.glob("../content/transformations/*.json", { eager: true }),
        route: (id) => `/lore/energy-powers/transformations/${id}`
    },
    {
        type: "rules",
        label: "Rules",
        modules: import.meta.glob("../content/rules/*.json", { eager: true }),
        route: (id) => `/rulesbook/${id}`
    },
    {
        type: "era",
        label: "Timeline",
        modules: import.meta.glob("../content/timeline/*.json", { eager: true }),
        // Todas las eras viven en la misma página, así que el resultado lleva a
        // su tramo, no al principio.
        route: (id, entry) => entry.name ? `/lore/timeline#${slug(entry.name)}` : null
    },
    {
        type: "section",
        label: "Sections",
        modules: import.meta.glob("../content/lore/*.json", { eager: true }),
        // Las tarjetas de la página Lore ya traen su destino escrito.
        route: (id, entry) => entry.route ?? null
    }
];

// Nota: src/content/side-worlds queda fuera a propósito. Esas dimensiones son
// solo un botón en la página Worlds, no tienen ficha, así que un resultado que
// las señalara no llevaría a ninguna parte.


// Las páginas del propio sitio. No son contenido editable —son componentes—, así
// que no salen de ningún glob y hay que enumerarlas aquí: sin esto, buscar
// "worlds" encontraba las entradas que mencionan la palabra, pero no la página
// Worlds.
//
// Las tres tarjetas de Lore (Gods, Important Items, Mechanics) NO van en esta
// lista: esas sí son contenido, viven en src/content/lore y ya entran por el
// glob de arriba. Duplicarlas aquí las sacaría dos veces.
//
// La descripción dice para qué sirve la página, no qué contiene: lo que contiene
// cambia con el tiempo y además ya está indexado por su cuenta.
const PAGES = [
    { route: "/",  title: "Home",
      text: "The front page of the archive." },

    { route: "/rulesbook", title: "Rulesbook",
      text: "The rules of the server: conduct, roleplay, combat and moderation." },

    { route: "/lore", title: "Lore",
      text: "General information about the universe." },

    { route: "/worlds", title: "Worlds",
      text: "Every world and side dimension in the setting." },

    { route: "/species", title: "Species",
      text: "The species that inhabit the setting, including companion-only species." },

    { route: "/factions", title: "Factions",
      text: "The factions of every dimension." },

    { route: "/lore/energy-powers/energy", title: "Energy",
      text: "The kinds of energy in the setting and where they come from." },

    { route: "/lore/energy-powers/powers", title: "Powers",
      text: "The kinds of powers a character can have." },

    { route: "/lore/energy-powers/transformations", title: "Transformations",
      text: "Superforms, awakenings and the other ways a character can transform." },

    { route: "/credits", title: "Credits",
      text: "Who made the art and the archive." }
];


// Claves que no son texto que nadie vaya a buscar: rutas de imagen, colores,
// números de orden y campos de maquetación. Se saltan al recoger el texto.
// (Los números y booleanos se ignoran solos: collectText solo recoge cadenas.)
const SKIP_KEYS = new Set([
    // Rutas de imagen
    "image", "background", "icon", "avatar", "flag", "map",
    "imageFolder", "placeholderImage",
    // Maquetación: encuadres, zooms y de qué lado va la imagen
    "imagePosition", "imageZoom", "imageSide",
    "backgroundPosition", "backgroundZoom",
    // Identificadores, relaciones y config
    "color", "route", "order", "id", "type", "group", "category",
    "world", "faction", "count",
    // Solo sirve para fabricar los nombres de las entradas de relleno
    // ("Safe Area 1"), que precisamente no se indexan
    "placeholderLabel"
]);


// Recoge todo el texto de un trozo de JSON, sea cual sea su forma. Se recorre en
// genérico en vez de nombrar campo por campo para que un campo nuevo del CMS
// entre solo en el buscador, sin tocar esto.
function collectText(value, out){

    if(typeof value === "string"){

        const clean = value.trim();

        if(clean){
            out.push(clean);
        }

        return;

    }

    if(Array.isArray(value)){

        value.forEach(v => collectText(v, out));

        return;

    }

    if(value && typeof value === "object"){

        Object.entries(value).forEach(([key, v]) => {

            if(!SKIP_KEYS.has(key)){
                collectText(v, out);
            }

        });

    }

}


// Los bloques de una ficha ya generan anclas (#overview, #biology...) para la
// tabla de contenidos. Aquí se aprovechan: si lo que has buscado aparece dentro
// de un bloque, el resultado enlaza a esa sección y no al principio de la ficha.
function sectionsOf(entry){

    return (entry.blocks ?? [])
        .filter(block => block?.title?.trim())
        .map(block => {

            const parts = [];
            collectText(block, parts);

            return {
                title: block.title,
                anchor: slug(block.title),
                haystack: normalize(parts.join(" "))
            };

        });

}


// Sin acentos y en minúsculas: buscar "solaris" encuentra "Solaris" y buscar
// "leon" encuentra "León".
//
// Tiene que conservar la longitud, porque el resaltado y el recorte buscan la
// posición sobre el texto normalizado y luego cortan el ORIGINAL por ese índice:
// si al normalizar se perdieran caracteres, la marca saldría desplazada.
//
// De ahí \p{Mn} (marcas combinantes) y no \p{Diacritic}, que parece lo lógico
// pero no lo es: \p{Diacritic} incluye el punto medio "·" —es diacrítico en
// catalán, la ele geminada "ŀ"— y resulta que "·" es justo el separador que se
// usa más abajo para unir los campos. Con \p{Diacritic} cada separador anterior
// a la coincidencia corría el resaltado un carácter.
//
// \p{Mn} solo quita los acentos que produce NFD ("é" → "e"+◌́ → "e"), así que la
// longitud se mantiene y la puntuación se queda como está.
//
// (slug.js sí usa \p{Diacritic}, y ahí debe seguir: cambiarlo alteraría las
// anclas ya generadas.)
export function normalize(text){

    return (text ?? "")
        .normalize("NFD")
        .replace(/\p{Mn}/gu, "")
        .toLowerCase();

}


// El índice se construye una sola vez, la primera vez que alguien busca.
let cachedIndex = null;

export function buildIndex(){

    if(cachedIndex){
        return cachedIndex;
    }

    const entries = [];

    // Primero las páginas del sitio. El orden aquí da igual para el resultado
    // final (manda la puntuación), pero van delante porque son la puerta de
    // entrada a todo lo demás.
    PAGES.forEach(page => {

        entries.push({
            id: `page:${page.route}`,
            title: page.title,
            type: "page",
            typeLabel: "Pages",
            route: page.route,
            image: null,
            text: page.text,
            normalizedTitle: normalize(page.title),
            haystack: normalize(`${page.title} ${page.text}`),
            sections: []
        });

    });

    COLLECTIONS.forEach(collection => {

        Object.entries(collection.modules).forEach(([path, mod]) => {

            const id = path.split("/").pop().replace(".json", "");
            const data = mod.default ?? mod;

            const route = collection.route(id, data);

            // Sin ruta no hay resultado: un enlace que no lleva a ninguna parte
            // es peor que no aparecer.
            if(!route){
                return;
            }

            const title = data.name ?? data.title ?? id;

            const words = [];
            collectText(data, words);

            entries.push({
                id: `${collection.type}:${id}`,
                title,
                type: collection.type,
                typeLabel: collection.label,
                route,
                image: data.image ?? null,
                text: words.join(" · "),
                normalizedTitle: normalize(title),
                haystack: normalize(words.join(" ")),
                sections: sectionsOf(data)
            });

        });

    });

    cachedIndex = entries;

    return entries;

}


// ─────────────────────────── La búsqueda ───────────────────────────

// Cuanto más "de lleno" da la consulta en el nombre, más arriba sale. El texto
// del cuerpo puntúa por debajo de cualquier coincidencia en el nombre, para que
// buscar "chaos" saque antes la entrada Chaos que las diez que lo mencionan.
function score(entry, query){

    const { normalizedTitle, haystack } = entry;

    if(normalizedTitle === query)             return 100;
    if(normalizedTitle.startsWith(query))     return 80;
    if(new RegExp(`\\b${escapeRegExp(query)}`).test(normalizedTitle)) return 60;
    if(normalizedTitle.includes(query))       return 40;
    if(haystack.includes(query))              return 20;

    return 0;

}


function escapeRegExp(text){

    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

}


// Un trocito de texto alrededor de la coincidencia, para que en la lista se vea
// por qué ha salido ese resultado.
export function snippetFor(entry, query){

    const at = normalize(entry.text).indexOf(query);

    if(at < 0){
        return entry.text.slice(0, 120) + (entry.text.length > 120 ? "…" : "");
    }

    const from = Math.max(0, at - 60);
    const to = Math.min(entry.text.length, at + query.length + 60);

    return (from > 0 ? "…" : "")
        + entry.text.slice(from, to).trim()
        + (to < entry.text.length ? "…" : "");

}


export default function search(rawQuery, limit = 40){

    const query = normalize(rawQuery).trim();

    // Con una sola letra el resultado es todo el archivo: no vale de nada.
    if(query.length < 2){
        return [];
    }

    return buildIndex()
        .map(entry => {

            const value = score(entry, query);

            if(value === 0){
                return null;
            }

            // Si la coincidencia está dentro de un bloque, el enlace apunta a
            // esa sección concreta de la ficha.
            const section = entry.sections.find(s => s.haystack.includes(query));

            return {
                ...entry,
                score: value,
                section: section ?? null,
                href: section ? `${entry.route}#${section.anchor}` : entry.route
            };

        })
        .filter(Boolean)
        .sort((a, b) =>
            b.score - a.score
            // A igualdad de puntos, el título más corto es la coincidencia más
            // ajustada: buscando "god" interesa antes "Gods" que "God of the
            // Desert", porque sobra menos título alrededor de lo que buscabas.
            || a.title.length - b.title.length
            || a.title.localeCompare(b.title))
        .slice(0, limit);

}
