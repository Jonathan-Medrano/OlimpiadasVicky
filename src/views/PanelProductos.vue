<template>
  <div class="admin-productos">
    <h2>Productos registrados 📦</h2>

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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.ID_Producto">
          <td>{{ p.ID_Producto }}</td>
          <td>{{ p.codigo }}</td>
          <td>{{ p.Nombre }}</td>
          <td>{{ p.Stock }}</td>
          <td>${{ p.Precio }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.tipo }}</td>
          <td>{{ p.condiciones }}</td>
          <td>
            <button class="btn-modificar" @click="modificarProducto(p)">Modificar</button>
            <button class="btn-eliminar" @click="eliminarProducto(p)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL EDICIÓN -->
    <div v-if="editProduct" class="modal">
      <div class="modal-content">
        <h3>Editar producto #{{ editProduct.ID_Producto }}</h3>
        <form @submit.prevent="guardarEdicion">
          <input v-model="editProduct.codigo" placeholder="Código" required />
          <input v-model="editProduct.Nombre" placeholder="Nombre" required />
          <input v-model="editProduct.descripcion" placeholder="Descripción" required />
          <input v-model="editProduct.tipo" placeholder="Tipo" required />
          <input v-model.number="editProduct.Precio" type="number" placeholder="Precio" required />
          <input v-model.number="editProduct.Stock" type="number" placeholder="Stock" required />
          <input v-model="editProduct.condiciones" placeholder="Condiciones" />
          <input v-model="editProduct.imagen" placeholder="URL de Imagen" />
          <div class="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" class="cerrar-btn" @click="editProduct = null">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelProductosView",
  data() {
    return {
      productos: [],
      editProduct: null,
    };
  },
  async mounted() {
    await this.cargarProductos();
  },
  methods: {
    async cargarProductos() {
      try {
        const res = await fetch("http://localhost/miapi/tables.php?action=product");
        const data = await res.json();
        this.productos = data.productos || [];
      } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("No se pudieron cargar los productos");
      }
    },
    modificarProducto(producto) {
      this.editProduct = { ...producto }; // abrir modal con copia
    },
    async guardarEdicion() {
      try {
        const res = await fetch("http://localhost/miapi/tables.php?action=updateProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editProduct),
        });
        const data = await res.json();
        if (data.success) {
          alert("Producto actualizado correctamente");
          await this.cargarProductos();
          this.editProduct = null;
        } else {
          alert("Error al actualizar: " + data.mensaje);
        }
      } catch (err) {
        console.error(err);
        alert("Error de servidor");
      }
    },
    async eliminarProducto(producto) {
      if (!confirm(`¿Eliminar el producto "${producto.Nombre}"?`)) return;

      try {
        const res = await fetch("http://localhost/miapi/tables.php?action=deleteProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: producto.ID_Producto }),
        });
        const data = await res.json();
        if (data.success) {
          alert("Producto eliminado correctamente");
          await this.cargarProductos();
        } else {
          alert("Error al eliminar: " + data.mensaje);
        }
      } catch (err) {
        console.error(err);
        alert("Error del servidor");
      }
    },
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
  max-width: 1100px;
  margin: 2rem auto;
  color: #4a4a4a;
  border: 1px solid #d1d9e6;
}

h2 {
  font-size: 2rem;
  color: #33475b;
  margin-bottom: 1.5rem;
  text-align: center;
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
  display: block;
  margin: 0 auto 1.8rem auto;
  box-shadow: 0 4px 8px rgba(120, 69, 160, 0.5);
}

.tabla-productos {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3cfd9;
}

th {
  background-color: #556b8a;
  color: white;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

td {
  padding: 0.8rem;
  color: #4a4a4a;
  font-size: 0.9rem;
  border: 1px solid #e1e7f0;
  background-color: #fdfdfd;
}

tbody tr:hover {
  background-color: #e9f0ff;
  box-shadow: 0 2px 10px rgba(52, 93, 184, 0.15);
}

.btn-modificar {
  background-color: #4caf50;
  color: white;
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.btn-eliminar {
  background-color: #e53935;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

/* MODAL */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #2c3e50;
  text-align: center;
}

.modal-content form input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-buttons button {
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-buttons button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

.cerrar-btn {
  background-color: #e53935;
  color: white;
}
</style>
