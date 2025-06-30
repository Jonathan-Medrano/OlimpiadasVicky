<template>
  <div class="vehiculos">
    <h1>VEHÍCULOS PARA ALQUILAR 🚗</h1>
    <br />

    <div v-if="vehiculos.length === 0">
      <p>No hay vehículos disponibles por el momento.</p>
    </div>

    <div v-else class="grid">
      <div class="card" v-for="v in vehiculos" :key="v.id">
        <img :src="v.imagen || defaultImg" alt="imagen" />
        <h3>{{ v.Nombre }}</h3>
        <p class="tipo">{{ v.tipo }}</p>
        <p class="descripcion">{{ v.descripcion }}</p>
        <p class="precio">$ {{ v.Precio }}</p>
        <button @click="agregarAlCarrito(v)">Agregar al carrito 🛒</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehiculosView",
  data() {
    return {
      vehiculos: [],
      defaultImg: "https://via.placeholder.com/300x200?text=Sin+Imagen",
    };
  },
  mounted() {
    this.obtenerVehiculos();
  },
  methods: {
    async obtenerVehiculos() {
      try {
        const res = await fetch("http://localhost/miapi/products.php?action=vehicles");
        const data = await res.json();
        this.vehiculos = data.vehiculos || [];
      } catch (err) {
        console.error("Error al obtener vehículos:", err);
        alert("No se pudieron cargar los vehículos.");
      }
    },
    agregarAlCarrito(producto) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) {
        alert("Debés iniciar sesión para agregar al carrito.");
        this.$router.push("/login");
        return;
      }

      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Vehículo agregado al carrito.");
    },
  },
};
</script>

<style scoped>
.vehiculos {
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
