<template>
  <div class="navbar-superior">
    <router-link to="/admin" class="logo-area">
      <img src="@/assets/logo.png" class="logo" />
      <span class="titulo">Panel de Administración</span>
    </router-link>

    <div class="acciones">
      <button @click="cerrarSesion" class="btn btn-cerrar">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarSuperiorAdmin",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("usuario");
      this.$router.push("/").then(() => location.reload());
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
  background-color: #6a5acd;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.btn-cerrar {
  background-color: #f57373;
}
</style>
