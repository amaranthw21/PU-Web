// Generador de países placeholder. Cuando tengas los reales, sustituye estas
// llamadas por objetos explícitos: { id, name, flag, type }.
const placeholders = (type, label, count) =>
    Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return {
            id: `${type}-${n}`,
            name: `${label} ${n}`,
            flag: `/worlds/moebius/flags/${type}-${n}.png`,
            type
        };
    });


export const moebius = {

    id: "moebius",
    name: "Moebius",

    presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

    map: "/worlds/moebius/map.jpg",

    countryGroups: [
        { id: "main", label: "Countries" }
    ],

    countries: [
        ...placeholders("main", "Country", 15)
    ]

};


export default moebius;
