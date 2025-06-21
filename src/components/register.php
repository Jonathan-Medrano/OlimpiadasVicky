<?php
$conexion = new mysqli("localhost", "root", "", "turity_empresa");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

if (isset($_POST['nombre'], $_POST['correo'], $_POST['contrasena'])) {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

    // Consulta directa (solo para prueba)
    $sql = "INSERT INTO cliente (Nombre, Correo, Contraseña) VALUES ('$nombre', '$correo', '$contrasena')";

    if ($conexion->query($sql) === TRUE) {
        echo "Registro exitoso con consulta directa.";
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }
} else {
    echo "Faltan datos del formulario";
}

$conexion->close();
?>