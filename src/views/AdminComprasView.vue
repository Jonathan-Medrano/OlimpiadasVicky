<template>
  <div class="admin-compras">
    <h2>Compras realizadas 🧾</h2>

    <div v-if="compras.length === 0">
      <p>No se han registrado compras aún.</p>
    </div>

    <table v-else class="tabla-compras">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in compras" :key="compra.id">
          <td>{{ compra.id }}</td>
          <td>{{ compra.cliente_nombre }}</td>
          <td>{{ compra.fecha }}</td>
          <td>${{ compra.total }}</td>
          <td>
            <button @click="verDetalle(compra)">🔍</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal detalle -->
    <div v-if="detalleCompra" class="modal">
      <div class="modal-content">
        <h3>Detalle de la compra #{{ detalleCompra.id }}</h3>
        <ul>
          <li v-for="item in detalleCompra.items" :key="item.id">
            {{ item.nombre }} x {{ item.cantidad }} → ${{ item.precio_unitario * item.cantidad }}
          </li>
        </ul>
        <button @click="detalleCompra = null">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminComprasView",
  data() {
    return {
      compras: [],
      detalleCompra: null,
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/tables.php?action=purchases");
      const data = await res.json();
      this.compras = data.compras || [];
    } catch (error) {
      console.error("Error al cargar compras:", error);
      alert("No se pudieron cargar las compras");
    }
  },
  methods: {
    verDetalle(compra) {
      this.detalleCompra = compra;
    },
  },
};
</script>

<style scoped>
.admin-compras {
  padding: 2rem;
}
.tabla-compras {
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
}
</style>
