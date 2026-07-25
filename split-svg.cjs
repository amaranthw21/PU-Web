const fs = require("fs");
const { DOMParser, XMLSerializer } = require("xmldom");

const input = "E:/PU_Web/src/assets/frame.svg";
const outputDir = "./sectores";

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const svgText = fs.readFileSync(input, "utf8");

const parser = new DOMParser();
const doc = parser.parseFromString(svgText, "image/svg+xml");

const svg = doc.documentElement;

// Buscar el grupo original
const originalGroup = svg.getElementsByTagName("g")[0];

// Convertirlo a texto
const serializer = new XMLSerializer();
const groupContent = serializer.serializeToString(originalGroup);


// Medidas
const width = 765;
const height = 990;

const sectorWidth = width / 3;
const sectorHeight = height / 3;


// Crear los 9 sectores
let sector = 1;

for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {

        const x = col * sectorWidth;
        const y = row * sectorHeight;


        const svgOutput = `<?xml version="1.0" encoding="UTF-8"?>
<svg
 xmlns="http://www.w3.org/2000/svg"
 viewBox="${x} ${y} ${sectorWidth} ${sectorHeight}">

 <defs>
    <clipPath id="clip">
        <rect 
            x="${x}" 
            y="${y}" 
            width="${sectorWidth}" 
            height="${sectorHeight}"
        />
    </clipPath>
 </defs>

 <g clip-path="url(#clip)">
    ${groupContent}
 </g>

</svg>
`;


        fs.writeFileSync(
            `${outputDir}/sector${sector}.svg`,
            svgOutput
        );

        console.log(`Creado sector${sector}.svg`);

        sector++;
    }
}