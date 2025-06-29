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
  font-family: "Nonito", sans-serif;
}

.btn:hover {
  background-color: #3d4f67;
  border-radius: 5px;
}

.btn i {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}
.btn span {
  font-size: 0.8rem;
}
.btn.activo {
  background-color: #1f2a38;
  border-bottom: 2px solid #a463f2;
}
</style>
