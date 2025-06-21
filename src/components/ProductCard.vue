<template>
  <div class="card">
    <img :src="producto.imagen" alt="imagen del producto" class="card-img" />
    <h3>{{ producto.nombre }}</h3>
    <p>{{ producto.descripcion }}</p>
    <p><strong>Precio:</strong> ${{ producto.precio }}</p>

    <div class="acciones">
      <button @click="$emit('agregar-carrito', producto)">Agregar al carrito</button>
      <button v-if="admin" @click="$emit('editar', producto)">Editar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    producto: Object,
    admin: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
}
.card-img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
}
.acciones {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
