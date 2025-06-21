<template>
  <div class="admin-view">
    <h2>Panel de Administración</h2>
    <p>Bienvenido, {{ usuario?.nombre }}.</p>

    <div class="panel-links">
      <router-link to="/admin/usuarios" class="panel-card">
        <i class="fas fa-users"></i>
        <span>Usuarios</span>
      </router-link>
      <router-link to="/admin/productos" class="panel-card">
        <i class="fas fa-box"></i>
        <span>Productos</span>
      </router-link>
      <router-link to="/admin/compras" class="panel-card">
        <i class="fas fa-receipt"></i>
        <span>Compras</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      usuario: null,
    };
  },
  mounted() {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      this.usuario = JSON.parse(datos);
    }
  },
};
</script>

<style scoped>
.admin-view {
  padding: 2rem;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
}

.panel-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.panel-card {
  background-color: #2e3a59;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 180px;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
}

.panel-card:hover {
  background-color: #3f4b6e;
}

.panel-card i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}
</style>
