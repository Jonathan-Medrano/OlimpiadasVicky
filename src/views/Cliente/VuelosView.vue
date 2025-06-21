<template>
  <div class="vuelos">
    <h2>Vuelos disponibles ✈️</h2>

    <div v-if="productos.length === 0">
      <p>No hay vuelos cargados por el momento.</p>
    </div>

    <div class="grid">
      <ProductCard
        v-for="vuelo in productos"
        :key="vuelo.id"
        :producto="vuelo"
        @agregar-carrito="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "VuelosView",
  components: { ProductCard },
  data() {
    return {
      productos: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/get_productos.php?tipo=Vuelo");
      const data = await res.json();
      this.productos = data.productos || [];
    } catch (error) {
      console.error("Error al cargar los vuelos:", error);
      alert("Error al cargar los vuelos");
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
      alert("Vuelo agregado al carrito");
    },
  },
};
</script>

<style scoped>
.vuelos {
  padding: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
