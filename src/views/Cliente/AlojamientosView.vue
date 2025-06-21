v
<template>
  <div class="alojamientos">
    <h2>Alojamientos disponibles 🏨</h2>

    <div v-if="productos.length === 0">
      <p>No hay alojamientos disponibles en este momento.</p>
    </div>

    <div class="grid">
      <ProductCard
        v-for="alojamiento in productos"
        :key="alojamiento.id"
        :producto="alojamiento"
        @agregar-carrito="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "AlojamientosView",
  components: { ProductCard },
  data() {
    return {
      productos: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/get_productos.php?tipo=Alojamiento");
      const data = await res.json();
      this.productos = data.productos || [];
    } catch (error) {
      console.error("Error al cargar alojamientos:", error);
      alert("No se pudieron cargar los alojamientos");
    }
  },
  methods: {
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
.alojamientos {
  padding: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
