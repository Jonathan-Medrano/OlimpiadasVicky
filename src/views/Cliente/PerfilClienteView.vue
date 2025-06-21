<template>
  <div class="perfil-cliente">
    <h2>Mi cuenta 👤</h2>

    <div class="info-usuario" v-if="usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Email:</strong> {{ usuario.email }}</p>
      <p><strong>Rol:</strong> {{ usuario.rol }}</p>
    </div>

    <h3>Historial de compras 📦</h3>

    <div v-if="compras.length === 0">
      <p>Aún no realizaste ninguna compra.</p>
    </div>

    <table v-else class="tabla-compras">
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in compras" :key="compra.id">
          <td>{{ compra.id }}</td>
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
        <h3>Compra #{{ detalleCompra.id }}</h3>
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
  name: "PerfilClienteView",
  data() {
    return {
      usuario: null,
      compras: [],
      detalleCompra: null,
    };
  },
  mounted() {
    const datosUsuario = localStorage.getItem("usuario");
    if (!datosUsuario) {
      this.$router.push("/login");
      return;
    }

    this.usuario = JSON.parse(datosUsuario);
    this.cargarCompras();
  },
  methods: {
    async cargarCompras() {
      try {
        const res = await fetch(
          "http://localhost/miapi/get_compras_cliente.php?id_usuario=" + this.usuario.id
        );
        const data = await res.json();
        this.compras = data.compras || [];
      } catch (err) {
        console.error(err);
        alert("No se pudieron cargar tus compras");
      }
    },
    verDetalle(compra) {
      this.detalleCompra = compra;
    },
  },
};
</script>

<style scoped>
.perfil-cliente {
  padding: 2rem;
}
.info-usuario {
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
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
