// Base de datos de documentos
// Datos de los PDFs (solo los que mencionaste)
const pdfs = [
    {
        nombre: "Xuegu animales espresión oral",
        archivo: "XUEGU_ANIMALES_ESPERSION_ORAL.pdf",
        bloque: "bloque1"
    },
    {
        nombre: "Madreñes - Comprensión y espresión escrita",
        archivo: "Madrenes_Comprension_espresion_escrita.pdf",
        bloque: "bloque3"
    }
];

// Función de búsqueda super simple
function buscarPDF() {
    const termino = document.getElementById('busqueda').value.toLowerCase();
    const resultados = pdfs.filter(pdf => pdf.nombre.toLowerCase().includes(termino));
    
    const contenedor = document.getElementById('resultados-busqueda');
    contenedor.innerHTML = resultados.map(pdf => `
        <div class="pdf-item">
            <p>${pdf.nombre}</p>
            <a href="pdfs/${pdf.bloque}/${pdf.archivo}" target="_blank">Abrir</a>
            <a href="pdfs/${pdf.bloque}/${pdf.archivo}" download>Descargar</a>
        </div>
    `).join('');
    
    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
    }
}

// Cargar PDFs por bloque (sencillo)
function cargarBloque(bloque) {
    const contenedor = document.getElementById('pdfs-bloque');
    const documentos = pdfs.filter(pdf => pdf.bloque === bloque);
    
    contenedor.innerHTML = documentos.map(pdf => `
        <div class="pdf-item">
            <p>${pdf.nombre}</p>
            <a href="../pdfs/${bloque}/${pdf.archivo}" target="_blank">Abrir</a>
        </div>
    `).join('');
}

function mostrarResultados(resultados) {
    const contenedor = document.getElementById('resultados-busqueda');
    contenedor.innerHTML = '';
    
    if (resultados.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <p>Nun s'atoparon documentos</p>
            </div>
        `;
        return;
    }
    
    resultados.forEach(pdf => {
        const div = document.createElement('div');
        div.className = 'resultado';
        div.innerHTML = `
            <h3>${pdf.nombre}</h3>
            <p>${pdf.descripcion}</p>
            <span class="etiqueta-bloque">${pdf.bloque}</span>
            <a href="pdfs/${pdf.bloque.toLowerCase()}/${pdf.archivo}" target="_blank">Ver</a>
        `;
        contenedor.appendChild(div);
    });
}

// Cargar PDFs por bloque
function cargarPDFsBloque(bloque) {
    const contenedor = document.getElementById('pdfs-bloque');
    if (!contenedor) return;
    
    const pdfs = pdfsPorBloque[bloque] || [];
    contenedor.innerHTML = '';
    
    pdfs.forEach(pdf => {
        const div = document.createElement('div');
        div.className = 'documento-bloque';
        div.innerHTML = `
            <img src="../img/pdf-icon.png" alt="PDF">
            <div>
                <h3>${pdf.nombre}</h3>
                <p>${pdf.descripcion}</p>
                <a href="../pdfs/${bloque}/${pdf.archivo}" target="_blank">Abrir PDF</a>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// Cargar destacados en inicio
function cargarDestacados() {
    const contenedor = document.getElementById('documentos-destacados');
    if (!contenedor) return;
    
    let destacados = [];
    for (const bloque in pdfsPorBloque) {
        if (pdfsPorBloque[bloque].length > 0) {
            destacados.push(pdfsPorBloque[bloque][0]);
        }
    }
    
    contenedor.innerHTML = destacados.map(pdf => `
        <div class="documento-destacado">
            <img src="img/pdf-icon.png" alt="PDF">
            <h3>${pdf.nombre}</h3>
            <p>${pdf.descripcion}</p>
            <a href="pdfs/bloque${Object.keys(pdfsPorBloque).indexOf(pdf.bloque)+1}/${pdf.archivo}" target="_blank">Ver</a>
        </div>
    `).join('');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        cargarDestacados();
    }
    
    // Menús desplegables
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('menu-btn')) {
                const submenu = this.querySelector('.submenu');
                document.querySelectorAll('.submenu').forEach(sm => {
                    if (sm !== submenu) sm.style.display = 'none';
                });
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});