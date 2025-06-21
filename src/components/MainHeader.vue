<template>
  <div>
    <NavbarSuperiorInicio v-if="!usuario" />
    <NavbarSuperiorCliente v-else-if="usuario.rol === 'cliente'" />
    <NavbarSuperiorAdmin v-else-if="usuario.rol === 'admin'" />

    <NavbarCategorias v-if="!usuario" />
    <NavbarCategoriasCliente v-else-if="usuario.rol === 'cliente'" />
    <NavbarCategoriasAdmin v-else-if="usuario.rol === 'admin'" />
  </div>
</template>

<script>
import NavbarSuperiorInicio from "@/components/NavbarSuperiorInicio.vue";
import NavbarSuperiorCliente from "@/components/NavbarSuperiorCliente.vue";
import NavbarSuperiorAdmin from "@/components/NavbarSuperiorAdmin.vue";

import NavbarCategorias from "@/components/NavbarCategorias.vue";
import NavbarCategoriasCliente from "@/components/NavbarCategoriasCliente.vue";
import NavbarCategoriasAdmin from "@/components/NavbarCategoriasAdmin.vue";

export default {
  name: "MainHeader",
  data() {
    return {
      usuario: null,
    };
  },
  created() {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
  },
};
</script>
