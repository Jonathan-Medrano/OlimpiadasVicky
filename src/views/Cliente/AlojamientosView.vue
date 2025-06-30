<template>
  <div class="alojamientos">
    <h1>ALOJAMIENTOS Y HOSPEDAJE 🏠</h1>
    <br />

    <div v-if="alojamientos.length === 0">
      <p>No hay alojamientos disponibles por el momento.</p>
    </div>

    <div class="grid">
      <div class="card" v-for="a in alojamientos" :key="a.ID_Producto">
        <img :src="a.imagen || defaultImg" alt="imagen" />
        <h3>{{ a.Nombre }}</h3>
        <p class="condiciones">{{ a.condiciones }}</p>
        <p class="descripcion">{{ a.descripcion }}</p>
        <p class="precio">$ {{ a.Precio }}</p>
        <button @click="agregarAlCarrito(a)">Agregar al carrito 🛒</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlojamientosView",
  data() {
    return {
      alojamientos: [],
      defaultImg: "https://via.placeholder.com/300x180?text=Alojamiento",
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/products.php?action=accommodation");
      const data = await res.json();
      this.alojamientos = data.alojamientos || [];
    } catch (error) {
      console.error("Error al cargar los alojamientos:", error);
      alert("Error al cargar los alojamientos");
    }
  },
  methods: {
    agregarAlCarrito(producto) {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const existente = carrito.find((item) => item.ID_Producto === producto.ID_Producto);
      if (existente) {
        existente.Cantidad = (existente.Cantidad || 1) + 1;
      } else {
        carrito.push({ ...producto, Cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Alojamiento agregado al carrito");
    },
  },
};
</script>

<style scoped>
.alojamientos {
  padding: 2rem;
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: #c9d1e9;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f3b58;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
}

.card {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}

.card h3 {
  font-size: 1.1rem;
  margin: 0.3rem 0;
}

.card .destino {
  font-weight: bold;
  color: #555;
}

.card .descripcion {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

.card .precio {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.8rem 0;
  color: #007bff;
}

.card button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #7e60ff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.card button:hover {
  background-color: #614dd4;
}
</style>
