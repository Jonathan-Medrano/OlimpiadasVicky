<template>
  <div id="app">
    <!-- Navbar superior según usuario -->
    <component :is="navbarSeleccionado" />

    <!-- Navbar de categorías según usuario y ruta -->
    <component v-if="navbarCategoriasSeleccionado" :is="navbarCategoriasSeleccionado" />

    <!-- Contenido principal -->
    <router-view />
  </div>
</template>

<script>
import NavbarSuperiorInicio from "@/components/NavbarSuperiorInicio.vue";
import NavbarSuperiorCliente from "@/components/NavbarSuperiorCliente.vue";
import NavbarSuperiorAdmin from "@/components/NavbarSuperiorAdmin.vue";

import NavbarCategoriasCliente from "@/components/NavbarCategoriasCliente.vue";
import NavbarCategoriasAdmin from "@/components/NavbarCategoriasAdmin.vue";

export default {
  components: {
    NavbarSuperiorInicio,
    NavbarSuperiorCliente,
    NavbarSuperiorAdmin,
    NavbarCategoriasCliente,
    NavbarCategoriasAdmin,
  },
  data() {
    return {
      usuario: null,
    };
  },
  computed: {
    navbarSeleccionado() {
      if (!this.usuario) return "NavbarSuperiorInicio";
      if (this.usuario.rol === "admin") return "NavbarSuperiorAdmin";
      return "NavbarSuperiorCliente";
    },
    navbarCategoriasSeleccionado() {
      if (!this.usuario) return null;
      const ruta = this.$route.path.toLowerCase(); // aseguramos minúsculas
      if (this.usuario.rol === "cliente") return "NavbarCategoriasCliente";
      if (this.usuario.rol === "admin" && ruta.startsWith("/admin")) return "NavbarCategoriasAdmin";
      return null;
    },
  },
  mounted() {
    const datos = localStorage.getItem("usuario");
    if (datos) this.usuario = JSON.parse(datos);
  },
  watch: {
    $route() {
      const datos = localStorage.getItem("usuario");
      this.usuario = datos ? JSON.parse(datos) : null;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #f8f8f8;
}
</style>
