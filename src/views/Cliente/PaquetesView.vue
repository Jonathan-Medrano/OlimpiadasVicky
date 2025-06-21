<template>
  <div class="paquetes">
    <h2>Paquetes turísticos</h2>

    <div v-if="paquetes.length === 0">
      <p>No hay paquetes disponibles por el momento.</p>
    </div>

    <div class="grid">
      <div class="card" v-for="p in paquetes" :key="p.id">
        <img :src="p.imagen || defaultImg" alt="imagen" />
        <h3>{{ p.nombre }}</h3>
        <p class="destino">Destino: {{ p.destino }}</p>
        <p class="descripcion">{{ p.descripcion }}</p>
        <p class="precio">$ {{ p.precio_unitario }}</p>
        <button @click="agregarAlCarrito(p)">Agregar al carrito 🛒</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaquetesView",
  data() {
    return {
      paquetes: [],
      defaultImg: "https://via.placeholder.com/300x180?text=Paquete",
    };
  },
  mounted() {
    this.obtenerPaquetes();
  },
  methods: {
    async obtenerPaquetes() {
      try {
        const res = await fetch("http://localhost/miapi/get_paquetes.php");
        const data = await res.json();
        this.paquetes = data.paquetes || [];
      } catch (err) {
        console.error("Error al obtener paquetes:", err);
        alert("No se pudieron cargar los paquetes.");
      }
    },
    agregarAlCarrito(paquete) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) {
        alert("Debés iniciar sesión para agregar al carrito.");
        this.$router.push("/login");
        return;
      }

      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(paquete);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Paquete agregado al carrito.");
    },
  },
};
</script>

<style scoped>
.paquetes {
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
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
