// Generador de países placeholder. Cuando tengas los reales, sustituye estas
// llamadas por objetos explícitos: { id, name, flag, type }.
const placeholders = (type, label, count) =>
    Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return {
            id: `${type}-${n}`,
            name: `${label} ${n}`,
            flag: `/worlds/mobius/flags/${type}-${n}.png`,
            type
        };
    });


export const mobius = {

    id: "mobius",
    name: "Mobius",

    presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",

    map: "/worlds/mobius/map.jpg",

    // Grupos de países (orden + etiqueta). El "id" = campo `type` de cada país.
    countryGroups: [
        { id: "main",      label: "Main Countries" },
        { id: "secondary", label: "Secondary Countries" },
        { id: "territory", label: "Territories" }
    ],

    countries: [
        ...placeholders("main", "Country", 18),
        ...placeholders("secondary", "Secondary", 3),
        ...placeholders("territory", "Territory", 4)
    ]

};


export default mobius;
