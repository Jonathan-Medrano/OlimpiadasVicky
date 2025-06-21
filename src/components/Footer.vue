<template>
  <footer class="footer">
    <p>© {{ anioActual }} Turify – Todos los derechos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      anioActual: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #1e1e1e;
  color: #ccc;
  text-align: center;
  padding: 1.2rem;
  font-size: 0.9rem;
  font-family: "Segoe UI", sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
