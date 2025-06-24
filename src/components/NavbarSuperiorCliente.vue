<template>
  <div class="navbar-superior">
    <router-link to="/" class="logo-area">
      <img src="@/assets/logo.png" class="logo" />
      <span class="titulo"><strong>Planea fácil, viaja mejor</strong></span>
    </router-link>

    <div class="acciones">
      <router-link
        to="carrito"
        class="carrito fas fa-shopping-cart"
        aria-hidden="true"
      ></router-link>
      <router-link to="/perfil" class="btn-perfil fas fa-circle-user"></router-link>
      <button @click="cerrarSesion" class="btn">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarSuperiorCliente",
  methods: {
    async cerrarSesion() {
      console.log("Cerrar sesión clickeado");
      try {
        const res = await fetch("http://localhost/miapi/usuarios/sessions.php?action=logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Respuesta fetch:", res);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json(); // Si el backend devuelve JSON
        console.log("Datos recibidos:", data);

        // Si la respuesta indica éxito:
        if (data.success) {
          localStorage.removeItem("usuario");
          this.usuario = null;
          this.$router.push("/");
        } else {
          console.error("Error en logout backend:", data.message || data);
        }
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* o el tamaño que prefieras */
  height: 40px;
  background-color: #a573f5; /* mismo color que Cerrar sesión */
  border: none;
  border-radius: 20px; /* círculo */
  color: white;
  cursor: pointer;
  font-size: 18px;
}
.carrito {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
