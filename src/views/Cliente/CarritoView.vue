<template>
  <div class="carrito">
    <h2>Tu carrito de compras 🧳</h2>

    <div v-if="carrito.length === 0">
      <p>No hay productos en el carrito.</p>
      <router-link to="/">Ir a explorar viajes</router-link>
    </div>

    <table v-else class="tabla-carrito">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in carrito" :key="i">
          <td>{{ item.nombre }}</td>
          <td>${{ item.precio_unitario }}</td>
          <td>
            <input
              type="number"
              v-model.number="item.cantidad"
              @input="actualizarCarrito"
              min="1"
            />
          </td>
          <td>${{ item.precio_unitario * item.cantidad }}</td>
          <td><button @click="eliminar(i)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>

    <div v-if="carrito.length > 0" class="total">
      <p><strong>Total:</strong> ${{ total }}</p>
      <button @click="realizarCompra">Confirmar compra</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarritoView",
  data() {
    return {
      carrito: [],
    };
  },
  computed: {
    total() {
      return this.carrito.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);
    },
  },
  methods: {
    cargarCarrito() {
      const datos = localStorage.getItem("carrito");
      this.carrito = datos ? JSON.parse(datos) : [];
    },
    actualizarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    eliminar(index) {
      this.carrito.splice(index, 1);
      this.actualizarCarrito();
    },
    async realizarCompra() {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) return alert("Debés iniciar sesión");

      try {
        const res = await fetch("http://localhost/miapi/realizar_compra.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: usuario.id,
            carrito: this.carrito,
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert("Compra realizada con éxito");
          localStorage.removeItem("carrito");
          this.carrito = [];
        } else {
          alert(data.message || "No se pudo completar la compra");
        }
      } catch (err) {
        console.error(err);
        alert("Error al conectarse con el servidor");
      }
    },
  },
  mounted() {
    this.cargarCarrito();
  },
};
</script>

<style scoped>
.carrito {
  padding: 2rem;
}

.tabla-carrito {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.8rem;
  text-align: center;
}

input[type="number"] {
  width: 60px;
}

.total {
  text-align: right;
  font-size: 1.2rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2e3a59;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
