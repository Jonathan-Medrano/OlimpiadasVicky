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
  font-family: "Montserrat", sans-serif;
  background-color: #f9f9fb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 2rem auto;
  color: #4a4a4a;
  border: 1px solid #d1d9e6; /* borde suave para contenedor */
}

h2 {
  font-size: 2rem;
  color: #33475b;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 1.2px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.Insertar {
  background-color: #9970df;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: block;
  margin: 0 auto 1.8rem auto;
  box-shadow: 0 4px 8px rgba(120, 69, 160, 0.5);
  text-decoration: none; /* sacar subrayado del texto */
  font-family: "Montserrat", sans-serif; /* tipografía igual a la tabla */
}

.Insertar:hover {
  background-color: #7456a9;
  box-shadow: 0 6px 14px rgba(120, 69, 160, 0.5);
}

.tabla-productos {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3cfd9; /* borde suave para la tabla */
}

th {
  background-color: #556b8a;
  color: white;
  padding: 1rem 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-right: 1px solid #485a7a;
}

th:last-child {
  border-right: none;
}

td {
  padding: 0.8rem;
  color: #4a4a4a;
  font-size: 0.9rem;
  font-weight: 500;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fdfdfd;
  border-radius: 6px;
  border: 1px solid #e1e7f0; /* borde suave en cada celda */
}

tbody tr {
  background-color: #fdfdfd;
  transition: background-color 0.25s ease;
  border-radius: 6px;
  display: table-row; /* para mantener el diseño correcto */
}

tbody tr:hover {
  background-color: #e9f0ff;
  box-shadow: 0 2px 10px rgba(52, 93, 184, 0.15);
  cursor: pointer;
}
</style>
