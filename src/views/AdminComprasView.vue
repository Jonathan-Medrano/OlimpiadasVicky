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
            <button class="detalle-btn" @click="verDetalle(compra)">🔍</button>
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
        <button class="cerrar-btn" @click="detalleCompra = null">Cerrar</button>
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
  font-family: "Montserrat", sans-serif;
  background-color: #f9f9fb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 2rem auto;
  color: #4a4a4a;
  border: 1px solid #d1d9e6;
}

.admin-compras h2 {
  font-size: 2rem;
  color: #33475b;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 1.2px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.tabla-compras {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #c3cfd9;
}

.tabla-compras thead th {
  background-color: #556b8a;
  color: white;
  padding: 1rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-right: 1px solid #485a7a;
}

.tabla-compras thead th:last-child {
  border-right: none;
}

.tabla-compras tbody td {
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fdfdfd;
  border: 1px solid #e1e7f0;
  color: #4a4a4a;
  text-align: center;
}

.tabla-compras tbody tr:hover {
  background-color: #e9f0ff;
  cursor: pointer;
}

.detalle-btn {
  background-color: #33475b;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.detalle-btn:hover {
  background-color: #2a3c4f;
}

/* Modal */
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-family: "Montserrat", sans-serif;
}

.modal-content h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #2c3e50;
  text-align: center;
}

.modal-content ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.modal-content li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}

.cerrar-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.cerrar-btn:hover {
  background-color: #e04646;
}
</style>
