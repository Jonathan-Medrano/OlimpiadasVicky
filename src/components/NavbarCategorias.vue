<template>
  <nav class="navbar-categorias">
    <router-link
      v-for="item in categorias"
      :key="item.nombre"
      :to="item.ruta"
      :class="{ activo: route.path === item.ruta }"
      class="categoria"
    >
      <i :class="item.icono"></i>
      <span>{{ item.nombre }}</span>
    </router-link>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "NavbarCategorias",
  setup() {
    const route = useRoute();

    const categorias = [
      { nombre: "Paquetes", ruta: "/paquetes", icono: "fas fa-suitcase-rolling" },
      { nombre: "Vuelos", ruta: "/vuelos", icono: "fas fa-plane" },
      { nombre: "Vehículos", ruta: "/vehiculos", icono: "fas fa-car-side" },
      { nombre: "Alojamiento", ruta: "/alojamientos", icono: "fas fa-bed" },
      { nombre: "Actividades", ruta: "/actividades", icono: "fas fa-ticket-alt" },
      { nombre: "Ayuda", ruta: "/ayuda", icono: "fas fa-headset" },
    ];

    return { route, categorias };
  },
};
</script>

<style scoped>
.navbar-categorias {
  display: flex;
  justify-content: space-around;
  background-color: #2b2e4a;
  padding: 0.3rem 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.categoria {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-family: "Nonito", sans-serif;
}

.categoria:hover {
  background-color: #3d4f67;
}

.categoria i {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.categoria span {
  font-size: 0.8rem;
}

.categoria.activo {
  background-color: #1f2a38;
  border-bottom: 2px solid #485d78;
}
</style>
