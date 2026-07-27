// Generador de zonas placeholder. Cuando tengas las reales, sustituye estas
// llamadas por objetos explícitos: { id, name, flag, type }.
const placeholders = (type, label, count) =>
    Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return {
            id: `${type}-${n}`,
            name: `${label} ${n}`,
            flag: `/worlds/future-200/flags/${type}-${n}.png`,
            type
        };
    });


export const future = {

    id: "future-200",
    name: "200 Years Future",

    presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    map: "/worlds/future-200/map.jpg",

    // Grupos con explicación propia (descripción bajo el título).
    countryGroups: [
        {
            id: "safe",
            label: "Safe Areas",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: "missing",
            label: "Missing Territories",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ],

    countries: [
        ...placeholders("safe", "Safe Area", 4),
        ...placeholders("missing", "Missing Territory", 3)
    ]

};


export default future;
