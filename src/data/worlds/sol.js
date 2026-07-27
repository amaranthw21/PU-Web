// Generador de países placeholder. Cuando tengas los reales, sustituye estas
// llamadas por objetos explícitos: { id, name, flag, type }.
const placeholders = (type, label, count) =>
    Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return {
            id: `${type}-${n}`,
            name: `${label} ${n}`,
            flag: `/worlds/sol/flags/${type}-${n}.png`,
            type
        };
    });


export const sol = {

    id: "sol",
    name: "Sol",

    presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    map: "/worlds/sol/map.jpg",

    countryGroups: [
        { id: "main", label: "Countries" }
    ],

    countries: [
        ...placeholders("main", "Country", 7)
    ]

};


export default sol;
