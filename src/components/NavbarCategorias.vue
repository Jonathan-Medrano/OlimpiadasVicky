<template>
  <div class="navbar-categorias" :class="{ oculto: ocultar }">
    <router-link to="/paquetes"
      ><i class="fas fa-suitcase-rolling"></i><span>Paquetes</span></router-link
    >
    <router-link to="/vuelos"><i class="fas fa-plane"></i><span>Vuelos</span></router-link>
    <router-link to="/alquileres"
      ><i class="fas fa-car-side"></i><span>Vehiculos</span></router-link
    >
    <router-link to="/alojamientos"><i class="fas fa-bed"></i><span>Alojamiento</span></router-link>
    <router-link to="/actividades"
      ><i class="fas fa-ticket-alt"></i><span>Actividades</span></router-link
    >
    <router-link to="/ayuda"><i class="fas fa-headset"></i><span>Ayuda</span></router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarCategorias",
  data() {
    return {
      ocultar: false,
      scrollAnterior: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.manejarScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.manejarScroll);
  },
  methods: {
    manejarScroll() {
      const actual = window.scrollY;
      this.ocultar = actual > this.scrollAnterior && actual > 60;
      this.scrollAnterior = actual;
    },
  },
};
</script>

<style scoped>
.navbar-categorias {
  background-color: #2e3a59;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  padding: 0.4rem 0;
  position: sticky;
  top: 72px; /* debajo del navbar superior */
  z-index: 999;
  transition: transform 0.3s ease-in-out;
}

.navbar-categorias.oculto {
  transform: translateY(-100%);
}

.navbar-categorias a {
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar-categorias i {
  font-size: 1.3rem;
  margin-bottom: 3px;
}
</style>
