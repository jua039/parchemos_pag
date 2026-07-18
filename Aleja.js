const formulario = document.getElementById('iniciarSesion');

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