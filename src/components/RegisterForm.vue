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
.register-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.btn-register {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #45a049;
}
</style>
