document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'http://localhost:3001/refacciones';
    const refaccionesBody = document.getElementById('refacciones-body');
    const form = document.getElementById('refaccion-form');
    const limpiarBtn = document.getElementById('limpiar-btn');

    let editando = false;
    let refaccionIdEditar = null;

    // Función para cargar las refacciones
    function cargarRefacciones() {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(refacciones => {
                refaccionesBody.innerHTML = '';
                refacciones.forEach(refaccion => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${refaccion.marca}</td>
                        <td>${refaccion.categoria}</td>
                        <td>${refaccion.precio}</td>
                        <td>
                            <button class="editar-btn" data-id="${refaccion.id}" data-marca="${refaccion.marca}" data-categoria="${refaccion.categoria}" data-precio="${refaccion.precio}">Editar</button>
                            <button class="eliminar-btn" data-id="${refaccion.id}">Eliminar</button>
                        </td>
                    `;
                    refaccionesBody.appendChild(row);
                });

                agregarEventosBotones();
            })
            .catch(error => console.error('Error al cargar refacciones:', error));
    }

    // Función para agregar o editar una refacción
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nuevaRefaccion = {
            marca: document.getElementById('marca').value,
            categoria: document.getElementById('categoria').value,
            precio: document.getElementById('precio').value
        };

        if (editando) {
            // Editar refacción existente
            fetch(`${API_URL}/${refaccionIdEditar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaRefaccion)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar datos');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Refacción actualizada correctamente:', data);
                    form.reset();
                    editando = false;
                    refaccionIdEditar = null;
                    cargarRefacciones();
                })
                .catch(error => console.error('Error al actualizar refacción:', error));
        } else {
            // Agregar nueva refacción
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaRefaccion)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar datos');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Refacción agregada correctamente:', data);
                    form.reset();
                    cargarRefacciones();
                })
                .catch(error => console.error('Error al agregar refacción:', error));
        }
    });

    // Función para eliminar refacción
    function eliminarRefaccion(event) {
        const id = event.target.dataset.id;
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar');
                }
                cargarRefacciones();
            })
            .catch(error => console.error('Error al eliminar refacción:', error));
    }

    // Función para cargar datos en el formulario para editar
    function cargarEnFormulario(event) {
        const button = event.target;
        const marca = button.dataset.marca;
        const categoria = button.dataset.categoria;
        const precio = button.dataset.precio;
        refaccionIdEditar = button.dataset.id;

        document.getElementById('marca').value = marca;
        document.getElementById('categoria').value = categoria;
        document.getElementById('precio').value = precio;

        editando = true;
    }

    // Asignar eventos a botones dinámicos
    function agregarEventosBotones() {
        document.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', eliminarRefaccion);
        });

        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', cargarEnFormulario);
        });
    }

    // Limpiar tabla
    limpiarBtn.addEventListener('click', function () {
        refaccionesBody.innerHTML = '';
    });

    // Cargar refacciones al inicio
    cargarRefacciones();
});
