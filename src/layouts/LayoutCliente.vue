<template>
  <div class="layout-cliente">
    <!-- Navbars cliente -->
    <NavbarSuperiorCliente />
    <NavbarCategoriasCliente />

    <!-- Acá va el contenido de la vista -->
    <router-view />
  </div>
</template>

<script>
import NavbarSuperiorCliente from "@/components/NavbarSuperiorCliente.vue";
import NavbarCategoriasCliente from "@/components/NavbarCategoriasCliente.vue";

export default {
  name: "LayoutCliente",
  components: {
    NavbarSuperiorCliente,
    NavbarCategoriasCliente,
  },
};
</script>

<style scoped>
.layout-cliente {
  min-height: 100vh;
  background-color: #f7f8fb;
}
</style>
