<template>
  <div class="vehiculos-view">
    <h2>Vehículos disponibles</h2>

    <div v-if="productos.length === 0">
      <p>No hay Vehículos disponibles actualmente.</p>
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="vehiculo in productos"
        :key="vehiculo.id"
        :producto="vehiculo"
        @agregar-carrito="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "VehiculosView",
  components: { ProductCard },
  data() {
    return {
      productos: [],
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
        this.productos = data.vehiculos;
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    agregarAlCarrito(producto) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const existente = carrito.find((item) => item.id === producto.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Alojamiento agregado al carrito");
    },
  },
};
</script>

<style scoped>
.vehiculos-view {
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
