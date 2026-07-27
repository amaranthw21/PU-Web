import { mobius } from "./mobius";
import { moebius } from "./moebius";
import { sol } from "./sol";
import { future } from "./future";


// Mundos con página propia, indexados por su id (para WorldPage / CountryDetail).
export const worldsById = {
    [mobius.id]: mobius,
    [moebius.id]: moebius,
    [sol.id]: sol,
    [future.id]: future
};


// Botones de la página Worlds — fila principal (Main Hub).
export const mainWorlds = [
    { id: "mobius",      name: "Mobius",           image: "/worlds/mobius.jpg", route: "/worlds/mobius" },
    { id: "moebius",     name: "Moebius",          image: "/worlds/moebius.jpg", route: "/worlds/moebius" },
    { id: "sol",         name: "Sol",              image: "/worlds/sol.png", imageZoom: 1.4, route: "/worlds/sol" },
    { id: "future-200",  name: "200 Years Future", image: "/worlds/200yearsfuture.webp", route: "/worlds/future-200" }
];


// Botones de la página Worlds — segunda fila (Side Dimensions).
export const otherWorlds = [
    { id: "world-1", name: "Maginaryworld",  image: "/worlds/maginaryworld.webp" },
    { id: "world-2", name: "Twilight Cage",  image: "/worlds/twilightcage.webp" },
    { id: "world-3", name: "Dreamscape",     image: "/worlds/dreamscape.webp" },
    { id: "world-4", name: "Null Space",     image: "/worlds/nullspace.jpg" },
    { id: "world-5", name: "Cyber Space",    image: "/worlds/cyberspace.webp" },
    { id: "world-6", name: "White Space",    image: "/worlds/whitespace.webp" },
    { id: "world-7", name: "Book Dimension", image: "/worlds/bookdimension.jpg" }
];
