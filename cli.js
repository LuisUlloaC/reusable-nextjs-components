#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs/promises"); // Utilizamos fs.promises
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "src", "components");
const DESTINATION_DIR = path.join(process.cwd(), "ui", "components");

async function getComponents() {
    // Usamos fs.promises.readdir para leer los archivos de manera asíncrona
    const files = await fs.readdir(COMPONENTS_DIR);
    const components = [];

    for (const file of files) {
        const filePath = path.join(COMPONENTS_DIR, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isDirectory()) {
            components.push(file);
        }
    }

    return components;
}

async function runCLI() {
    const components = await getComponents(); // Usamos await aquí

    const { selectedComponents } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "selectedComponents",
            message: "Selecciona los componentes que deseas instalar:",
            choices: [...components, "Todos"],
        },
    ]);

    if (selectedComponents.includes("Todos")) {
        selectedComponents.length = 0;
        selectedComponents.push(...components);
    }

    for (const component of selectedComponents) {
        const source = path.join(COMPONENTS_DIR, component);
        const destination = path.join(DESTINATION_DIR, component);

        await fs.copyFile(source, destination);
        console.log(`✅ ${component} instalado en ${destination}`);
    }

    console.log("\n🚀 Instalación completa.\n");
}

runCLI().catch((error) => {
    console.error("Error durante la instalación:", error);
});
