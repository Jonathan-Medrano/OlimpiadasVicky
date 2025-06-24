<template>
  <div class="actividades">
    <h2>Actividades turísticas 🎟️</h2>

    <div v-if="productos.length === 0">
      <p>No hay actividades disponibles actualmente.</p>
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="actividad in productos"
        :key="actividad.id"
        :producto="actividad"
        @agregar-carrito="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ActividadesView",
  components: { ProductCard },
  data() {
    return {
      productos: [],
    };
  },
  mounted() {
    this.obtenerActividades();
  },
  methods: {
    async obtenerActividades() {
      try {
        const res = await fetch("http://localhost/miapi/products.php?action=activities");
        const data = await res.json();
        this.productos = data.actividades || [];
      } catch (error) {
        console.error("Error al cargar actividades:", error);
        alert("No se pudieron cargar las actividades");
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
      alert("Actividad agregada al carrito");
    },
  },
};
</script>

<style scoped>
.actividades {
  padding: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
