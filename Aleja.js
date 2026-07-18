const formulario = document.getElementById('iniciarSesion');

// Se ejecuta automáticamente cuando el usuario inicia sesión con Google
function manejarRespuestaGoogle(respuesta) {
    // respuesta.credential es un JWT (token) firmado por Google
    const datosUsuario = JSON.parse(atob(respuesta.credential.split('.')[1]));

    console.log("Usuario verificado por Google:", datosUsuario);

    const usuario = {
        correo: datosUsuario.email,
        nombre: datosUsuario.name,
        foto: datosUsuario.picture,
        metodo: "google",
    };

    localStorage.setItem('formulario', JSON.stringify(usuario));
    alert("¡Bienvenido, " + datosUsuario.name + "!");

    // Aquí podrías redirigir, por ejemplo:
    // window.location.href = "inicio.html";
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // Leer los valores DENTRO del submit, no al cargar la página
    const email = document.getElementById('floatingInput').value;
    const contraseña = document.getElementById('floatingPassword').value;
    const recordar = document.getElementById('guardarInfo').checked;

    if (email === "admin@correo.com" && contraseña === "123456") {
        alert("¡Bienvenido!");

        // Solo guardamos en localStorage si el usuario marcó "Guardar información"
        if (recordar) {
            const usuario = {
                correo: email,
                contraseña: contraseña,
                checked: recordar,
            };

            localStorage.setItem('formulario', JSON.stringify(usuario));
            console.log("Datos guardados en localStorage", usuario);
        }
    } else {
        alert("Usuario o contraseña incorrecta");
    }
});