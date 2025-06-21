<template>
  <form @submit.prevent="handleRegister" class="register-form">
    <div class="form-group">
      <label for="nombre">Nombre:</label>
      <input v-model="nombre" type="text" id="nombre" name="nombre" required />
    </div>

    <div class="form-group">
      <label for="apellido">Apellido:</label>
      <input v-model="apellido" type="text" id="apellido" name="apellido" required />
    </div>

    <div class="form-group">
      <label for="email">Correo electrónico:</label>
      <input v-model="email" type="email" id="email" name="email" required />
    </div>

    <div class="form-group">
      <label for="telefono">Teléfono:</label>
      <input v-model="telefono" type="number" id="telefono" name="telefono" required />
    </div>

    <div class="form-group">
      <label for="genero">Género:</label>
      <select v-model="genero" id="genero" name="genero" required>
        <option value="" disabled>Seleccione género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="No Binarie">No Binarie</option>
      </select>
    </div>

    <div class="form-group">
      <label for="nacimiento">Fecha de nacimiento:</label>
      <input v-model="nacimiento" type="date" id="nacimiento" name="nacimiento" required />
    </div>

    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" name="password" required />
    </div>

    <button type="submit" class="btn-register">Registrarse</button>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      genero: "",
      nacimiento: "",
      password: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const formData = new FormData();
        formData.append("nombre", this.nombre);
        formData.append("apellido", this.apellido);
        formData.append("email", this.email);
        formData.append("telefono", this.telefono);
        formData.append("genero", this.genero);
        formData.append("nacimiento", this.nacimiento);
        formData.append("password", this.password);

        const response = await fetch(
          "http://localhost/miapi/usuarios/sessions.php?action=register",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        if (data.success) {
          await this.$router.push("/login");
        }
      } catch (error) {
        console.error(error);
        console.error("No se pudo conectar con el servidor");
      }
    },
  },
};
</script>

<style scoped>
.registro-contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
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
