<template>
  <div class="home">
    <!-- Imagen de fondo -->
    <div class="hero">
      <div class="overlay">
        <div class="contenido-hero">
          <h1>Descubrí tu próximo destino soñado</h1>
          <p>
            Paquetes turísticos a medida, con todo incluido. Reservá en minutos y empezá a soñar.
          </p>
          <router-link to="/vuelos" class="boton-explorar">Explorar viajes ✈️</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  font-family: "Segoe UI", sans-serif;
}

/* Imagen de fondo tipo hero */
.hero {
  background-image: url("@/assets/montañas.jpg"); /* Asegurate de poner una imagen similar en esa ruta */
  background-size: cover;
  background-position: center;
  height: 80vh;
  position: relative;
}

/* Superposición suave */
.overlay {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.6));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Contenido */
.contenido-hero {
  max-width: 800px;
  padding: 2rem;
}

h1 {
  font-size: 2.3rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.boton-explorar {
  background: linear-gradient(to right, #c2a0ff, #d8bfff);
  color: #333;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid #999;
  transition: all 0.3s ease;
}

.boton-explorar:hover {
  transform: scale(1.05);
}
</style>
