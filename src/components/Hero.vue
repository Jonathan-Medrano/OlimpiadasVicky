<template>
  <div class="hero" :style="{ backgroundImage: `url(${imagenFondo})` }">
    <div class="overlay">
      <div class="contenido-hero">
        <h1>{{ titulo }}</h1>
        <p>{{ subtitulo }}</p>
        <slot></slot>
        <!-- espacio para botones o enlaces -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    titulo: String,
    subtitulo: String,
    imagenFondo: {
      type: String,
      default: "@/assets/montañas.jpg",
    },
  },
};
</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
  height: 80vh;
  position: relative;
}

.overlay {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.6));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

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
</style>
