<!-- src/views/public/InfoView.vue -->
<template>
  <div class="info-container">
    <div class="titulo-logo">
      <img src="@/assets/logo.png" class="logo" />
      <h1>Conocé Turity</h1>
    </div>
    <p>
      <span class="resaltado">Viajar con Turity</span> no es simplemente trasladarse de un lugar a
      otro. Es dejarse sorprender, relajarse, disfrutar y vivir momentos únicos, sabiendo que
      <strong>cada detalle está cuidadosamente pensado</strong> para que tu única preocupación sea
      elegir qué paisaje disfrutar primero.
    </p>

    <p>
      Desde el primer contacto, Turity te invita a ser parte de una experiencia distinta. Ya sea que
      busques unas <strong>vacaciones de descanso</strong>, una escapada romántica, una
      <strong>aventura familiar</strong> o una travesía con amigos, vas a encontrar una propuesta a
      tu medida.
    </p>

    <p>
      Lo que hace especial a Turity es la <strong>dedicación con la que trabajamos</strong>. Nos
      ocupamos de cada etapa del viaje:
      <em
        >los mejores hoteles, traslados seguros, actividades atractivas y atención personalizada</em
      >
      antes, durante y después del viaje.
    </p>

    <p>
      Nuestros destinos abarcan desde los rincones más populares hasta
      <strong>lugares escondidos que sorprenden</strong> por su belleza. Siempre buscamos que vivas
      algo más que un recorrido turístico: que conectes con la cultura local y te lleves recuerdos
      inolvidables.
    </p>

    <p>
      Turity no vende pasajes, <span class="resaltado">vende momentos</span>. No arma itinerarios,
      <span class="resaltado">construye historias</span>. Y en cada viaje, sentimos orgullo de ser
      parte de tu sueño.
    </p>
  </div>
</template>

<style scoped>
.info-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  font-family: "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #2c3e50;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e70;
}

.resaltado {
  font-weight: bold;
  color: #5a2ca0;
}

.titulo-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  width: 60px;
  height: auto;
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e70;
}
</style>
