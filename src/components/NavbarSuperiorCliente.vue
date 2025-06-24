<template>
  <div class="navbar-superior">
    <router-link to="/" class="logo-area">
      <img src="@/assets/logo.png" class="logo" />
      <span class="titulo">Planea fácil, viaja mejor</span>
    </router-link>

    <div class="acciones">
      <router-link to="/perfil" class="btn btn-perfil">Mi Perfil</router-link>
      <button @click="cerrarSesion" class="btn">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarSuperiorCliente",
  methods: {
    async cerrarSesion() {
      try {
        await fetch("http://localhost/miapi/usuarios/sessions.php?action=logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        localStorage.removeItem("usuario");
        this.usuario = null;
        this.$router.push("/");
      } catch (e) {
        console.error("Error cerrando sesión:", e);
      }
    },
  },
};
</script>

<style scoped>
.navbar-superior {
  background-color: #2b2e4a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
}

.logo {
  height: 48px;
}

.titulo {
  font-size: 1.3rem;
  font-weight: bold;
}

.acciones {
  display: flex;
  gap: 1rem;
}

.btn {
  background-color: #f57373;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.btn-perfil {
  background-color: #a57df4;
}
</style>
