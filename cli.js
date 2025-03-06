#!/usr/bin/env node
const { checkbox } = require('@inquirer/prompts');
const fs = require('fs-extra');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components');
const DESTINATION_DIR = path.join(process.cwd(), 'ui', 'components');

function getComponents() {
    return fs.readdirSync(COMPONENTS_DIR).filter((file) => {
        return fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory();
    });
}

async function runCLI() {
    const components = getComponents();

    const selectedComponents = await checkbox({
        message: 'Selecciona los componentes que deseas instalar:',
        choices: [...components, 'Todos'],
    });

    if (!Array.isArray(selectedComponents)) {
        console.error('Error: selectedComponents no es un array.');
        return;
    }

    if (selectedComponents.includes('Todos')) {
        selectedComponents.length = 0;
        selectedComponents.push(...components);
    }

    selectedComponents.forEach((component) => {
        const source = path.join(COMPONENTS_DIR, component);
        const destination = path.join(DESTINATION_DIR, component);

        fs.copySync(source, destination);
        console.log(`✅ ${component} instalado en ${destination}`);
    });

    console.log('\n🚀 Instalación completa.\n');
}

runCLI().catch((error) => {
    console.error('Error durante la instalación:', error);
});
