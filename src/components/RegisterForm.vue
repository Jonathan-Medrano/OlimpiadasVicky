<template>
  <div class="registro-contenedor">
    <div class="registro-box">
      <div class="icono-usuario">
        <img src="@/assets/perfil-icono.png" alt="Icono usuario" />
      </div>
      <h2>Crear cuenta</h2>
      <p class="subtitulo">Registrate gratis para planear tu próxima aventura 🌍</p>

      <form @submit.prevent="registrar">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" required />
        </div>

        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input type="text" id="apellido" v-model="apellido" required />
        </div>

        <div class="form-group">
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" v-model="correo" required />
        </div>

        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input type="text" id="telefono" v-model="telefono" required />
        </div>

        <div class="form-group">
          <label for="genero">Género:</label>
          <select id="genero" v-model="genero" required>
            <option value="" disabled selected>Seleccioná tu género</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="No Binarie">No Binarie</option>
          </select>
        </div>

        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" v-model="contrasena" required />
        </div>

        <p class="link-inicio">
          ¿Ya tenés cuenta?
          <router-link to="/login">Iniciá sesión</router-link>
        </p>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      genero: "",
      contrasena: "",
    };
  },
  methods: {
    registrar() {
      // Lógica para enviar datos al backend
      console.log("Registrado:", this.nombre, this.correo);
    },
  },
};
</script>

<style scoped>
.registro-contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(to right, #f0fff0, #f7f7f7);
}

.registro-box {
  background-color: #d3b8e1;
  padding: 2rem;
  border-radius: 10px;
  width: 420px;
  text-align: center;
  border: 2px solid #333;
}

.icono-usuario img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.subtitulo {
  margin-bottom: 1rem;
  color: #4b4b4b;
  font-size: 0.9rem;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background-color: #f18193;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 1rem;
}

.link-inicio {
  margin-top: 10px;
  font-size: 0.9rem;
}

.link-inicio a {
  color: #3333aa;
  text-decoration: underline;
}
</style>
