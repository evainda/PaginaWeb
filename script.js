// Base de datos de documentos
const pdfsPorBloque = {
    bloque1: [
        {
            nombre: "Gramática Básica",
            archivo: "gramatica_basica.pdf",
            descripcion: "Normes gramaticales fundamentales del asturianu"
        },
        {
            nombre: "Historia de la Llingua",
            archivo: "historia_llingua.pdf",
            descripcion: "Evolución histórica del idioma asturianu"
        }
    ],
    bloque2: [
        {
            nombre: "Antoloxía Lliteraria",
            archivo: "antoloxia_literaria.pdf",
            descripcion: "Recopilación d'obres lliteraries asturianes"
        }
    ],
    bloque3: [
        {
            nombre: "Dialectos del Occidente",
            archivo: "dialectos_occidente.pdf",
            descripcion: "Estudiu de les variedaes occidentales"
        }
    ],
    bloque4: [
        {
            nombre: "Ensayos Lingüísticos",
            archivo: "ensayos_linguisticos.pdf",
            descripcion: "Analís de la llingua asturiana"
        }
    ]
};

// Función de búsqueda
function buscarPDF() {
    const termino = document.getElementById('busqueda').value.toLowerCase();
    const resultados = [];
    
    for (const bloque in pdfsPorBloque) {
        pdfsPorBloque[bloque].forEach(pdf => {
            if (pdf.nombre.toLowerCase().includes(termino) || 
                pdf.descripcion.toLowerCase().includes(termino)) {
                resultados.push({
                    ...pdf,
                    bloque: bloque.replace('bloque', 'Bloque ')
                });
            }
        });
    }
    
    mostrarResultados(resultados);
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