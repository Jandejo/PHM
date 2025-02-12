$(document).ready(function() {
  // Eventos y funciones de la página de login
  $('#login-form').on('submit', function(e) {
    e.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
      url: "https://refacciones-api.onrender.com/usuarios",
      method: "GET",
      success: function(data) {
        var usuarioValido = data.find(usuario => usuario.username === username && usuario.password === password);
        if (usuarioValido) {
          $('#login-page').hide();
          $('#main-page').show();
          cargarRefacciones();
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      },
      error: function(xhr, status, error) {
        console.error("Error al verificar usuario:", error);
        alert("Error al iniciar sesión, por favor intente de nuevo.");
      },
    });
  });

  // Cargar refacciones
  function cargarRefacciones() {
    $.ajax({
      url: "https://refacciones-api.onrender.com/refacciones",
      method: "GET",
      success: function(data) {
        const tbody = $("#refacciones-tbody");
        tbody.empty();
        data.forEach(refaccion => {
          tbody.append(generateRow(refaccion));
        });
      },
      error: function(xhr, status, error) {
        console.error("Error al cargar las refacciones:", error);
      },
    });
  }

  function generateRow(refaccion) {
    return `
      <tr>
        <td>${refaccion.nombre}</td>
        <td>${refaccion.categoria}</td>
        <td>${refaccion.precio}</td>
        <td>
          <button onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">Editar</button>
          <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
        </td>
      </tr>
    `;
  }

  // Mostrar y editar refacciones en el modal
window.mostrarModal = function(id, nombre, categoria, precio) {
  $("#edit-nombre").val(nombre);
  $("#edit-categoria").val(categoria); // Asegura que la categoría correcta esté seleccionada
  $("#edit-precio").val(precio);
  $("#edit-modal").show();

  $("#edit-refaccion-form").off('submit').on('submit', function(e) {
      e.preventDefault();
      const updatedRefaccion = {
          nombre: $("#edit-nombre").val(),
          categoria: $("#edit-categoria").val(),
          precio: $("#edit-precio").val(),
      };

      $.ajax({
          url: `https://refacciones-api.onrender.com/refacciones/${id}`,
          method: "PATCH",
          data: JSON.stringify(updatedRefaccion),
          contentType: "application/json",
          success: function() {
              $("#edit-modal").hide();
              cargarRefacciones();
          },
          error: function(err) {
              console.error("Error al actualizar la refacción:", err);
              alert("Error al actualizar la refacción.");
          },
      });
  });
};

// Cerrar modal
window.closeModal = function() {
  $("#edit-modal").hide();
};


  // Eliminar refacción
  window.eliminarRefaccion = function(id) {
    $.ajax({
      url: `https://refacciones-api.onrender.com/refacciones/${id}`,
      method: "DELETE",
      success: function() {
        cargarRefacciones();
      },
      error: function(err) {
        console.error("Error al eliminar la refacción:", err);
      },
    });
  };

  // Mostrar la página de agregar refacciones
  $("#add-refaccion-button").click(function() {
    $('#main-page').hide();
    $('#add-page').show();
  });

  // Agregar nueva refacción
  $('#add-refaccion-form').submit(function(e) {
    e.preventDefault();
    var newRefaccion = {
      nombre: $('#nombre').val(),
      categoria: $('#categoria').val(),
      precio: $('#precio').val()
    };
    $.ajax({
      url: 'https://refacciones-api.onrender.com/refacciones',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newRefaccion),
      success: function() {
        $('#add-page').hide();
        $('#main-page').show();
        cargarRefacciones();
      },
      error: function(xhr, status, error) {
        console.error("Error al agregar refacción:", error);
        alert("Error al agregar refacción.");
      }
    });
  });

  // Cerrar modal
  window.closeModal = function() {
    $("#edit-modal").hide();
  };
});
