<template>
  <div class="login-container">
    <div class="login-box">
      <div class="icono-usuario">
        <img src="@/assets/perfil-icono.png" alt="icono usuario" />
      </div>
      <h2>¡Bienvenido de nuevo!</h2>
      <p class="subtitulo">Ingresá tus datos para continuar tu viaje 🚀</p>

      <form @submit.prevent="iniciarSesion">
        <div class="campo">
          <label for="correo">Correo:</label>
          <input type="email" id="correo" v-model="correo" required />
        </div>

        <div class="campo">
          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" v-model="contrasena" required />
        </div>

        <p class="registro-link">
          ¿Todavía no tenés cuenta?
          <router-link to="/register">Registrate acá</router-link>
        </p>

        <button type="submit" class="btn-iniciar">Iniciar</button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      correo: "",
      contrasena: "",
      error: "",
    };
  },
  methods: {
    async iniciarSesion() {
      console.log("Enviando login:", this.correo, this.contrasena);
      try {
        this.error = "";
        const formData = new FormData();
        formData.append("email", this.correo);
        formData.append("clave", this.contrasena);

        const respuesta = await fetch("http://localhost/miapi/usuarios/sessions.php?action=login", {
          method: "POST",
          body: formData,
        });

        const datos = await respuesta.json();

        if (datos.success) {
          localStorage.setItem("usuario", JSON.stringify(datos.usuario));

          if (datos.usuario.rol === "cliente") {
            await this.$router.push("/");
          } else if (datos.usuario.rol === "admin") {
            await this.$router.push("/admin");
          } else {
            this.error = "Rol desconocido";
          }
        } else {
          this.error = datos.mensaje || "Credenciales incorrectas";
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8f8f8;
}

.login-box {
  background-color: #d5c2e6;
  border-radius: 15px;
  border: 2px solid #444;
  padding: 2rem;
  min-height: 440px;
  width: 540px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.icono-usuario img {
  width: 60px;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #333;
}

.subtitulo {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.campo {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-iniciar {
  margin-top: 1rem;
  background-color: #f4899b;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.btn-iniciar:hover {
  background-color: #e36a80;
}

.registro-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.registro-link a {
  color: #6a4ca1;
  font-weight: bold;
  text-decoration: none;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
