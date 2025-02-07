// Obtener elementos del DOM
const refaccionForm = document.getElementById("refaccion-form");
const marcaInput = document.getElementById("marca");
const categoriaInput = document.getElementById("categoria");
const precioInput = document.getElementById("precio");
const tablaBody = document.getElementById("refacciones-body");
const limpiarBtn = document.getElementById("limpiar-btn");

const modal = document.getElementById("edit-modal");
const closeModal = document.getElementById("close-modal");
const editForm = document.getElementById("edit-form");
const editMarcaInput = document.getElementById("edit-marca");
const editCategoriaInput = document.getElementById("edit-categoria");
const editPrecioInput = document.getElementById("edit-precio");

let refacciones = JSON.parse(localStorage.getItem('refacciones')) || [];
let editIndex = null;

// Función para renderizar la tabla
function renderTable() {
    tablaBody.innerHTML = '';
    
    // Renderizar refacciones guardadas (en localStorage)
    refacciones.forEach((refaccion, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${refaccion.marca}</td>
            <td>${refaccion.categoria}</td>
            <td>${refaccion.precio}</td>
            <td>
                <button class="editar-btn" data-index="${index}">Editar</button>
                <button class="eliminar-btn" data-index="${index}">Eliminar</button>
                <button class="guardar-btn" data-index="${index}" ${refaccion.guardada ? 'disabled' : ''}>Guardar</button>
            </td>
        `;
        tablaBody.appendChild(row);
    });
}

// Función para guardar refacciones en localStorage
function saveRefacciones() {
    localStorage.setItem('refacciones', JSON.stringify(refacciones));
}

// Manejar el evento submit del formulario principal
refaccionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const marca = marcaInput.value.trim();
    const categoria = categoriaInput.value;
    const precio = parseFloat(precioInput.value);

    if (editIndex !== null) {
        // Si se está editando, actualizar la refacción
        refacciones[editIndex] = { marca, categoria, precio, guardada: false };
        editIndex = null;
    } else {
        // Agregar nueva refacción
        refacciones.push({ marca, categoria, precio, guardada: false });
    }

    // Limpiar los campos y renderizar la tabla
    marcaInput.value = '';
    categoriaInput.value = '';
    precioInput.value = '';

    saveRefacciones();
    renderTable();
});

// Mostrar el modal para editar
tablaBody.addEventListener("click", function(event) {
    if (event.target.classList.contains('editar-btn')) {
        const index = event.target.dataset.index;
        const refaccion = refacciones[index];

        // Prellenar el formulario del modal
        editMarcaInput.value = refaccion.marca;
        editCategoriaInput.value = refaccion.categoria;
        editPrecioInput.value = refaccion.precio;

        // Establecer el índice de la refacción a editar
        editIndex = index;

        // Mostrar el modal
        modal.style.display = "block";
    }

    // Manejar la eliminación de una refacción
    if (event.target.classList.contains('eliminar-btn')) {
        const index = event.target.dataset.index;
        refacciones.splice(index, 1);
        saveRefacciones();
        renderTable();
    }

    // Manejar el guardar de una refacción
    if (event.target.classList.contains('guardar-btn')) {
        const index = event.target.dataset.index;
        refacciones[index].guardada = true;  // Marcar como guardada
        saveRefacciones();
        renderTable();
    }
});

// Cerrar el modal
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Manejar el evento submit del formulario de edición
editForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const marca = editMarcaInput.value.trim();
    const categoria = editCategoriaInput.value;
    const precio = parseFloat(editPrecioInput.value);

    // Actualizar la refacción
    refacciones[editIndex] = { marca, categoria, precio, guardada: false };
    
    // Guardar cambios y renderizar la tabla
    saveRefacciones();
    renderTable();
    
    // Cerrar el modal
    modal.style.display = "none";
});

// Limpiar la tabla (solo elimina las refacciones no guardadas)
limpiarBtn.addEventListener("click", function() {
    refacciones = refacciones.filter(refaccion => refaccion.guardada === true);
    saveRefacciones();
    renderTable();
});

// Inicializar la tabla con las refacciones guardadas
renderTable();
