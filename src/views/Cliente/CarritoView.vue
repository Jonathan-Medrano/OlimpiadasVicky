<template>
  <div class="carrito">
    <h2>Tu carrito de compras 🧳</h2>

    <div v-if="carrito.length === 0">
      <p>No hay productos en el carrito.</p>
      <router-link to="/">Ir a explorar viajes</router-link>
    </div>

    <div v-else>
      <table class="tabla-carrito">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in carrito" :key="item.clave">
            <td>
              <img :src="item.imagen || defaultImg" alt="Imagen del producto" width="120" />
            </td>
            <td>{{ item.Nombre }}</td>
            <td>${{ item.Precio.toFixed(2) }}</td>
            <td>
              <input
                type="number"
                v-model.number="item.Cantidad"
                @input="actualizarCarrito"
                min="1"
              />
            </td>
            <td>${{ (item.Precio * item.Cantidad).toFixed(2) }}</td>
            <td>
              <button @click="eliminar(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <p><strong>Total:</strong> ${{ total.toFixed(2) }}</p>
        <button @click="realizarCompra">Confirmar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarritoView",
  data() {
    return {
      carrito: [],
      defaultImg: "https://via.placeholder.com/200x150?text=Sin+Imagen",
    };
  },
  computed: {
    total() {
      return this.carrito.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0);
    },
  },
  methods: {
    cargarCarrito() {
      const datos = localStorage.getItem("carrito");
      const productos = datos ? JSON.parse(datos) : [];
      const agrupado = [];

      productos.forEach((item) => {
        const id = item.ID_Producto || item.id || item.id_producto || item.ID || "";
        const nombre = item.Nombre || item.nombre || "Sin nombre";
        const clave = `${id}_${nombre}`;

        const index = agrupado.findIndex((p) => p.clave === clave);

        if (index !== -1) {
          agrupado[index].Cantidad += Number(item.Cantidad) || 1;
        } else {
          agrupado.push({
            ...item,
            ID_Producto: id,
            Nombre: nombre,
            Precio: Number(item.Precio),
            Cantidad: Number(item.Cantidad) || 1,
            imagen: item.imagen || "",
            clave, // clave única para evitar conflictos
          });
        }
      });

      this.carrito = agrupado;
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

      if (!usuario) {
        return alert("Debés iniciar sesión para confirmar la compra.");
      }

      const carritoValido = this.carrito.every(
        (item) => item.ID_Producto && item.Nombre && item.Precio > 0 && item.Cantidad > 0
      );

      if (!carritoValido) {
        return alert("Hay productos con datos incompletos o inválidos.");
      }

      try {
        const res = await fetch("http://localhost/miapi/usuarios/shop.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: usuario.id,
            carrito: this.carrito,
          }),
        });

        const data = await res.json();

        if (data.success) {
          alert("Compra realizada con éxito 🛍️");
          localStorage.removeItem("carrito");
          this.carrito = [];
        } else {
          alert(data.message || "No se pudo completar la compra.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectarse con el servidor.");
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
  max-width: 1000px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2e3a59;
}

.tabla-carrito {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th {
  background-color: #2e3a59;
  color: white;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
}

img {
  max-width: 120px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="number"] {
  width: 70px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e04646;
}

.total {
  text-align: right;
  font-size: 1.4rem;
  font-weight: bold;
  color: #2e3a59;
}

.total button {
  margin-top: 1rem;
}
</style>
