<template>
  <div class="panel-compras">
    <h2>Gestión de Productos</h2>
    <p>Acá irán las compras realizadas por los clientes.</p>
  </div>
  <RouterLink to="/admin/insertar">
    <button class="Insertar">Insertar Producto</button>
  </RouterLink>
</template>

<script>
export default {
  name: "PanelComprasView",
};
</script>

<style scoped>
.panel-compras {
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}
</style>
