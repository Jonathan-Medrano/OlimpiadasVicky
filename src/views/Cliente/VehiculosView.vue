<template>
  <div class="vehiculos-view">
    <h1>Vehículos disponibles</h1>
    <div class="productos-grid">
      <ProductCard v-for="producto in vehiculos" :key="producto.ID_producto" :producto="producto" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "VehiculosView",
  components: {
    ProductCard,
  },
  data() {
    return {
      vehiculos: [],
    };
  },
  mounted() {
    this.obtenerVehiculos();
  },
  methods: {
    async obtenerVehiculos() {
      try {
        const response = await axios.get("http://localhost/api/obtener_productos.php");
        this.vehiculos = response.data.filter(
          (producto) => producto.categoria.toLowerCase() === "vehiculos"
        );
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
  },
};
</script>

<style scoped>
.vehiculos-view {
  padding: 2rem;
  text-align: center;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>
