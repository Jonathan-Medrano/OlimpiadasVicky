<template>
  <div id="app">
    <component :is="navbarSeleccionado" />
    <NavbarSuperiorInicio v-if="!usuario" />
    <NavbarSuperiorCliente v-else-if="usuario.rol === 'cliente'" />
    <NavbarSuperiorAdmin v-else-if="usuario.rol === 'admin'" />

    <NavbarCategoriasCliente v-if="usuario?.rol === 'cliente'" />
    <NavbarCategoriasAdmin v-if="usuario?.rol === 'admin' && esRutaAdmin" />
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
  // Navbar superior según el usuario
  navbarSeleccionado() {
    if (!this.usuario) return "NavbarSuperiorInicio";
    if (this.usuario.rol === "admin") return "NavbarSuperiorAdmin";
    return "NavbarSuperiorCliente";
  },

  // Navbar de categorías según usuario y ruta
  navbarCategoriasSeleccionado() {
    if (!this.usuario) return null;
    if (this.usuario.rol === "cliente") return "NavbarCategoriasCliente";
    if (this.usuario.rol === "admin" && this.$route.path.startsWith("/admin")) {
      return "NavbarCategoriasAdmin";
    }
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
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #f8f8f8;
}
</style>
