<template>
  <div class="admin-productos">
    <h2>Productos registrados 👥</h2>
    <RouterLink to="/admin/insertar">
      <button class="Insertar">Insertar Producto</button>
    </RouterLink>
    <div v-if="productos.length === 0">
      <p>No hay productos registrados aún.</p>
    </div>

    <table v-else class="tabla-productos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Tipo</th>
          <th>Condiciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.ID_Producto }}</td>
          <td>{{ p.codigo }}</td>
          <td>{{ p.Nombre }}</td>
          <td>{{ p.Stock }}</td>
          <td>{{ p.Precio }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.tipo }}</td>
          <td>{{ p.condiciones }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PanelProductosView",
  data() {
    return {
      productos: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/tables.php?action=product");
      const data = await res.json();
      this.productos = data.productos || [];
    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("No se pudieron cargar los productos");
    }
  },
};
</script>

<style scoped>
.admin-productos {
  padding: 2rem;
}
.tabla-productos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th,
td {
  border: 1px solid #ccc;
  padding: 0.8rem;
  text-align: center;
}
.Insertar {
}
</style>
