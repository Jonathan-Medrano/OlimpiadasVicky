<template>
  <div class="login-form">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="iniciarSesion">
      <input
        v-model="email"
        id="email"
        name="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        v-model="clave"
        id="clave"
        name="clave"
        type="password"
        placeholder="Contraseña"
        required
      />

      <button type="submit">Entrar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      clave: "",
      error: "",
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("clave", this.clave);

        const response = await fetch("http://localhost/miapi/usuarios/sessions.php?action=login", {
          method: "POST",
          body: formData,
        });

        const respuesta = await response.json();

        if (respuesta.success) {
          localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

          if (respuesta.usuario.rol === "admin") {
            this.$router.push("/admin");
            await location.reload();
          } else if (respuesta.usuario.rol === "cliente") {
            this.$router.push("/cliente/inicio");
            await location.reload();
          }
        } else {
          this.error = respuesta.mensaje || "Credenciales incorrectas.";
        }
      } catch (e) {
        this.error = "Error al conectar con el servidor.";
        console.error("Error de conexión:", e);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

input {
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  background-color: #2e3a59;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3e4e70;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
