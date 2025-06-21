<template>
  <div id="app">
    <component :is="navbarSeleccionado" />
    <NavbarCategoriasCliente v-if="usuario && usuario.rol === 'cliente'" />
    <router-view />
  </div>
</template>

<script>
import NavbarSuperiorInicio from "@/components/NavbarSuperiorInicio.vue";
import NavbarSuperiorCliente from "@/components/NavbarSuperiorCliente.vue";
import NavbarSuperiorAdmin from "@/components/NavbarSuperiorAdmin.vue";
import NavbarCategoriasCliente from "@/components/NavbarCategoriasCliente.vue";

export default {
  components: {
    NavbarSuperiorInicio,
    NavbarSuperiorCliente,
    NavbarSuperiorAdmin,
    NavbarCategoriasCliente,
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
  },

  created() {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      this.usuario = JSON.parse(datos);
    }
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
