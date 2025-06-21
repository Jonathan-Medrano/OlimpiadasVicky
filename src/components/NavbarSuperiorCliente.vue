<template>
  <nav class="navbar-superior">
    <div class="logo-area">
      <img src="@/assets/logo.png" alt="Turity" class="logo" />
      <span class="slogan">Planea fácil, viaja mejor</span>
    </div>
    <div class="perfil">
      <router-link to="/perfil-cliente">
        <img src="@/assets/perfil-icono.png" alt="Perfil" class="icono-perfil" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarSuperiorCliente",
};
</script>

<style scoped>
.navbar-superior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 0.5rem 1rem;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 0.5rem;
}

.slogan {
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
}

.perfil img {
  height: 40px;
  border-radius: 50%;
  background-color: #f08080;
  padding: 5px;
}
</style>
