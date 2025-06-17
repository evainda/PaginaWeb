// Base de datos de PDFs organizados por bloques
const pdfsPorBloque = {
    bloque1: [
        { nombre: 'Gramática del Bable', archivo: 'gramatica_bable.pdf' },
        { nombre: 'Historia de la Llingua', archivo: 'historia_llingua.pdf' }
    ],
    bloque2: [
        { nombre: 'Literatura Asturiana', archivo: 'literatura_asturiana.pdf' },
        { nombre: 'Autores Contemporáneos', archivo: 'autores_contemporaneos.pdf' }
    ],
    bloque3: [
        { nombre: 'Dialectos Regionales', archivo: 'dialectos_regionales.pdf' }
    ],
    bloque4: [
        { nombre: 'Ensayos Lingüísticos', archivo: 'ensayos_linguisticos.pdf' }
    ],
    otros: [
        { nombre: 'Autoria', archivo: 'autoria.pdf' },
        { nombre: 'Aitoria', archivo: 'aitoria.pdf' }
    ]
};

// Función de búsqueda mejorada
function buscarPDF() {
    const termino = document.getElementById('busqueda').value.toLowerCase();
    let resultados = [];
    
    // Buscar en todos los bloques
    for (const bloque in pdfsPorBloque) {
        pdfsPorBloque[bloque].forEach(pdf => {
            if (pdf.nombre.toLowerCase().includes(termino) || 
                pdf.archivo.toLowerCase().includes(termino)) {
                resultados.push({
                    ...pdf,
                    bloque: bloque.replace('bloque', 'Bloque ') || 'Otros materiales'
                });
            }
        });
    }
    
    mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('resultados-busqueda');
    contenedorResultados.innerHTML = '';
    
    if (resultados.length === 0) {
        contenedorResultados.innerHTML = '<p>Nun s\'atoparon documentos que coincidan cola to busca.</p>';
        return;
    }
    
    const html = resultados.map(pdf => `
        <div class="resultado-pdf">
            <img src="img/pdf-icon.png" alt="PDF">
            <div class="info-pdf">
                <h3>${pdf.nombre}</h3>
                <p>Bloque: ${pdf.bloque}</p>
                <a href="pdfs/${pdf.bloque.toLowerCase().replace(' ', '')}/${pdf.archivo}" target="_blank">Abrir PDF</a>
            </div>
        </div>
    `).join('');
    
    contenedorResultados.innerHTML = html;
}

// Cargar PDFs por bloque al entrar a cada página
function cargarPDFsBloque(bloque) {
    const pdfs = pdfsPorBloque[bloque] || [];
    const contenedor = document.getElementById('pdfs-bloque');
    
    if (!contenedor) return;
    
    contenedor.innerHTML = pdfs.map(pdf => `
        <div class="documento">
            <img src="../img/pdf-icon.png" alt="PDF">
            <p>${pdf.nombre}</p>
            <a href="../pdfs/${bloque}/${pdf.archivo}" target="_blank">Ver</a>
        </div>
    `).join('');
}
