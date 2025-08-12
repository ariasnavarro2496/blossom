// --- Definición de la función ---
function generarPartitura(notacion) {
    // Notas válidas
    const notasValidas = ["do", "re", "mi", "fa", "sol", "la", "si", "x"];
    const duracionesValidas = ["1", "1/2", "1/4"];

    // 1. Validaciones iniciales
    if (!Array.isArray(notacion) || notacion.length === 0) {
        throw new Error("La partitura esta vacia.");
    }

    // 2. Ordenar por index
    notacion.sort((a, b) => a.index - b.index);

    // 3. Validar datos y preparar arrays
    let totalDuracion = 0;
    const duraciones = [];
    const notas = [];

    for (const nota of notacion) {
        const { note, properties } = nota;
        const duracion = String(properties.duration);

        // Validar nota
        if (!notasValidas.includes(note.toLowerCase())) {
            throw new Error(`Nota inválida: ${note}`);
        }

        // Validar duración
        if (!duracionesValidas.includes(duracion)) {
            throw new Error(`Duración inválida: ${duracion}`);
        }

        // Acumular duración
        totalDuracion += eval(duracion); // Solo para fracciones simples

        // Guardar para formateo
        duraciones.push(duracion);
        notas.push(note.toLowerCase());
    }

    // 4. Validar suma total de duración
    if (totalDuracion !== 1) {
        throw new Error(`La suma de las duraciones es ${totalDuracion}, debe ser 1`);
    }

    // 5. Formatear salida alineada
    const maxLen = Math.max(...duraciones.map(d => d.length), ...notas.map(n => n.length));

    const duracionesStr = duraciones.map(d => d.padEnd(maxLen, " ")).join(" | ");
    const notasStr = notas.map(n => n.padEnd(maxLen, " ")).join(" | ");

    return `| ${duracionesStr} |\n| ${notasStr} |`;
}

// --- Datos de prueba ---
const notacion = [
    { index: 1, note: "do", properties: { duration: "1/4" } },
    { index: 2, note: "re", properties: { duration: "1/4" } },
    { index: 3, note: "mi", properties: { duration: "1/4" } },
    { index: 4, note: "fa", properties: { duration: "1/4" } }
];

const notacion2 = [
    { index: 5, note: "sol", properties: { duration: "1/2" } },
    { index: 6, note: "la", properties: { duration: "1/4" } },
    { index: 7, note: "si", properties: { duration: "1/4" } },
    
];

const notacion3 = [
    { index: 5, note: "sol", properties: { duration: "1" } },
    { index: 6, note: "la", properties: { duration: "1/4" } },
    { index: 7, note: "si", properties: { duration: "1/4" } },
    
];

// --- Ejecutar ---
try {
    const resultado1 = generarPartitura(notacion);
    console.log("Resultado caso 1:", resultado1);

    const resultado2 = generarPartitura(notacion2);
    console.log("Resultado caso 2:", resultado2);

    const resultado3 = generarPartitura(notacion3);
    console.log("Resultado caso 3:", resultado3);

} catch (error) {
    console.error("Error:", error.message);
}
