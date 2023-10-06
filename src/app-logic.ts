import fs from "fs";

const base = 5;
const limit = 10;
let outputMessage = "";
const header = `
===============================================
                Tabla del ${base}
===============================================\n
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} X ${i} = ${base * i}\n`;
}

outputMessage = header + outputMessage;
console.log(outputMessage);

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);

console.log("File created!");
