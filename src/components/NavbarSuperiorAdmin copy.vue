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
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  margin-left: 0.5rem;

  opacity: 0;
  transform: translateY(10px);
  animation: aparecerTitulo 1s ease-out forwards;
}

/* Animación */
@keyframes aparecerTitulo {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
.btn-cerrar:hover {
  background-color: #c05656;
}
</style>
