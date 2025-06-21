<template>
  <div class="navbar-superior">
    <router-link to="/" class="logo-area">
      <img src="@/assets/logo.png" class="logo" />
      <span class="titulo">Planea fácil, viaja mejor</span>
    </router-link>

    <div class="acciones">
      <template v-if="usuario">
        <router-link to="/perfil"><i class="fas fa-user-circle icono"></i></router-link>
        <button @click="cerrarSesion" class="btn">Cerrar sesión</button>
      </template>
      <template v-else>
        <router-link to="/login" class="btn">Iniciar sesión</router-link>
        <router-link to="/register" class="btn btn-secundario">Registrarse</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarSuperiorInicio",
  data() {
    return {
      usuario: null,
    };
  },
  mounted() {
    const datos = localStorage.getItem("usuario");
    if (datos) this.usuario = JSON.parse(datos);
  },
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
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-area {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  gap: 10px;
}

.logo {
  height: 52px;
}

.titulo {
  font-weight: 700;
  font-size: 1.4rem;
}

.acciones {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.btn {
  background: #ff7e7e;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
.btn-secundario {
  background: #ff9d9d;
}

.icono {
  font-size: 1.8rem;
  color: white;
}
</style>
