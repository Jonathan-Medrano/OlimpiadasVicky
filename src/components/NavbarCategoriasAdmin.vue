<template>
  <div class="navbar-categorias">
    <router-link to="/admin/usuarios" class="btn">Usuarios</router-link>
    <router-link to="/admin/productos" class="btn">Productos</router-link>
    <router-link to="/admin/compras" class="btn">Compras</router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarCategoriasAdmin",
};
</script>

<style scoped>
.navbar-categorias {
  background-color: #2b2e4a;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 2px solid #ccc;
}

.btn {
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
}

.btn:hover {
  background-color: #4b2c91;
}
</style>
