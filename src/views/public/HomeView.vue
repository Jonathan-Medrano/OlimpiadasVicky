<template>
  <div class="home-container">
    <!-- Imagen arriba del contenido -->
    <div class="imagen-superior">
      <img src="/montañas.jpg" alt="Montañas" />
    </div>

    <!-- Contenido centrado -->
    <div class="contenido">
      <h1>Descubrí tu próximo destino soñado</h1>
      <p>Paquetes turísticos a medida, con todo incluido. Reservá en minutos y empezá a soñar.</p>
      <router-link to="/info">
        <button class="explorar-btn">Explorar viajes ✈️</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  font-family: "Segoe UI", sans-serif;
  color: #2c3e50;
}

.imagen-superior img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.contenido {
  padding: 2rem 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;
}

.explorar-btn {
  background-color: #cfa2f3;
  color: #2c3e50;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Caprasimo", sans-serif;
}

.explorar-btn:hover {
  background-color: #a173d1;
}
</style>
