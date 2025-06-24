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
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: "Montserrat", sans-serif;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
}

.perfil-cliente h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.info-usuario {
  background-color: #f9f9fb;
  border-left: 4px solid #2c3e50;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.info-usuario p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

h3 {
  margin-top: 2rem;
  color: #34495e;
  font-size: 1.5rem;
}

.tabla-compras {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tabla-compras thead {
  background-color: #2c3e50;
  color: #fff;
}

th,
td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #34495e;
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #2c3e50;
}

.modal-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

.modal-content li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
