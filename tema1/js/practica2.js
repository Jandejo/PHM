// Referencias a los elementos del DOM
const form = document.getElementById("refaccion-form");
const marcaInput = document.getElementById("marca");
const categoriaInput = document.getElementById("categoria");
const precioInput = document.getElementById("precio");
const refaccionesTable = document.getElementById("refacciones-body");
const limpiarBtn = document.getElementById("limpiar-btn");

// Evento para agregar refacción
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Obtener valores de los inputs
    const marca = marcaInput.value.trim();
    const categoria = categoriaInput.value;
    const precio = precioInput.value.trim();

    if (marca === "" || categoria === "" || precio === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear una fila en la tabla
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${marca}</td>
        <td>${categoria}</td>
        <td>$${precio}</td>
        <td>
            <button class="eliminar-btn">Eliminar</button>
        </td>
    `;

    // Agregar la fila a la tabla
    refaccionesTable.appendChild(row);

    // Limpiar el formulario
    form.reset();

    // Evento para eliminar una fila
    row.querySelector(".eliminar-btn").addEventListener("click", function () {
        row.remove();
    });
});

// Evento para limpiar toda la tabla
limpiarBtn.addEventListener("click", function () {
    if (confirm("¿Seguro que quieres limpiar la tabla?")) {
        refaccionesTable.innerHTML = "";
    }
});
