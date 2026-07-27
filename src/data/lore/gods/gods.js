// Categorías de dioses: controla el ORDEN y la ETIQUETA de cada grupo.
// El "id" es lo que va en el campo `category` de cada dios más abajo.
export const godCategories = [
    { id: "mobius",  label: "Gods of Mobius" },
    { id: "sol",     label: "Gods of Sol" },
    { id: "moebius", label: "Gods of Moebius" },
    { id: "other",   label: "Other Gods" }
];


const gods = [

    // ── Gods of Mobius (4) ──────────────────────────────
    {
        id: "chaos",
        category: "mobius",
        name: "Chaos",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/perfect_chaos.jpg",
        imagePosition: "30% center",
        color: "#5bc0ff"
    },
    {
        id: "solaris",
        category: "mobius",
        name: "Solaris",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/solaris.png",
        color: "#a3e635",
    },
    {
        id: "darkgaia",
        category: "mobius",
        name: "Dark Gaia",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/dark-gaia.png",
    },
    {
        id: "lightgaia",
        category: "mobius",
        name: "Light Gaia",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/light-gaia.jpg",
        color: "#e45581"
    },


    // ── Gods of Sol (3) ─────────────────────────────────
    {
        id: "vajra",
        category: "sol",
        name: "Vajra",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/vajra.png",
        imagePosition: "20% 25% ",
        imageZoom: 1.5,
        color: "#fa6d1c"
    },
    {
        id: "null",
        category: "sol",
        name: "Null",
        description: "Description of the god.",
        domain: "Example Domain",
        image:"/gods/null.png",
        imagePosition: "center",
        color: "#ece8fb"
    },
    {
        id: "emerald-pantheon",
        category: "sol",
        name: "Emerald Pantheon",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/emerald-pantheon.png",
        color: "#33e6a6",
    },


    // ── Gods of Moebius (7) ─────────────────────────────
    {
        id: "astral-leviathan",
        category: "moebius",
        name: "Astral Leviathan",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/astral-leviathan.jpg",
        color: "#4d9fff"
    },
    {
        id: "inner-leviathan",
        category: "moebius",
        name: "Inner Leviathan",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/inner-leviathan.png",
        color: "#93e9be"
    },
    {
        id: "min",
        category: "moebius",
        name: "Min",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/min.webp",
        imagePosition: "30% center",
        color: "#e8a54e",
    },
    {
        id: "mata",
        category: "moebius",
        name: "Mata",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/mata.webp",
        imageZoom: 1.2,
        color: "#bfb8a1"
    },
    {
        id: "mawu",
        category: "moebius",
        name: "Mawu",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/mawu.webp",
        imagePosition: "30% center",
        color: "#9aa8bd",
    },
    {
        id: "selune",
        category: "moebius",
        name: "Selune",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/selune.webp",
        color: "#f5271e"
    },
    {
        id: "god-of-desert",
        category: "moebius",
        name: "God of the Desert",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/god-of-desert.jpeg",
        color: "#c17b3c"
    },


    // ── Other Gods (3) ──────────────────────────────────
    {
        id: "ilumina",
        category: "other",
        name: "Ilumina",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/ilumina.webp",
        imagePosition: "70% center",
        color: "#f8bcd0",
    },
    {
        id: "argus",
        category: "other",
        name: "Argus",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/argus.webp",
        imagePosition: "center 85%",
        imageZoom: 1.2,
        color: "#c2385a"
    },
    {
        id: "time-eater",
        category: "other",
        name: "Time Eater/Second Devourer",
        description: "Description of the god.",
        domain: "Example Domain",
        image: "/gods/time-eater.jpg",
        color: "#8be0ff",
    }

];


export default gods;
