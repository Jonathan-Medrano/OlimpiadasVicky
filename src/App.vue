<template>
  <div>
    <NavbarSuperior />
    <NavbarCategorias />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import NavbarSuperior from "@/components/NavbarSuperiorInicio.vue";
import NavbarCategorias from "@/components/NavbarCategorias.vue";

export default {
  components: {
    NavbarSuperior,
    NavbarCategorias,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
