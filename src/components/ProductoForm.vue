<template>
  <form @submit.prevent="guardarProducto" class="form-producto">
    <div class="form-group">
      <label for="codigo">Código del producto</label>
      <input v-model="producto.codigo_producto" id="codigo" required />
    </div>

    <div class="form-group">
      <label for="nombre">Nombre</label>
      <input v-model="producto.nombre" id="nombre" required />
    </div>

    <div class="form-group">
      <label for="descripcion">Descripción</label>
      <textarea v-model="producto.descripcion" id="descripcion" rows="2" />
    </div>

    <div class="form-group">
      <label for="tipo">Tipo</label>
      <select v-model="producto.tipo" id="tipo" required>
        <option disabled value="">Seleccioná tipo</option>
        <option>Paquete</option>
        <option>Vuelo</option>
        <option>Alojamiento</option>
        <option>Alquiler</option>
        <option>Actividad</option>
      </select>
    </div>

    <div class="form-group">
      <label for="precio">Precio unitario</label>
      <input type="number" v-model.number="producto.precio_unitario" id="precio" required />
    </div>

    <div class="form-group">
      <label for="cantidad">Cantidad disponible</label>
      <input type="number" v-model.number="producto.cantidad_disponible" id="cantidad" required />
    </div>

    <div class="form-group">
      <label for="condiciones">Condiciones</label>
      <textarea v-model="producto.condiciones" id="condiciones" rows="2" />
    </div>

    <button type="submit" class="btn-guardar">Guardar producto</button>
  </form>
</template>

<script>
export default {
  name: "ProductoForm",
  data() {
    return {
      producto: {
        codigo_producto: "",
        nombre: "",
        descripcion: "",
        tipo: "",
        precio_unitario: null,
        cantidad_disponible: null,
        condiciones: "",
      },
    };
  },
  methods: {
    async guardarProducto() {
      try {
        const res = await fetch("http://localhost/miapi/crear_producto.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.producto),
        });

        const data = await res.json();
        if (data.success) {
          alert("Producto guardado con éxito");
          this.$emit("producto-agregado");
          this.limpiarFormulario();
        } else {
          alert(data.message || "Error al guardar");
        }
      } catch (err) {
        console.error(err);
        alert("No se pudo conectar al servidor");
      }
    },
    limpiarFormulario() {
      this.producto = {
        codigo_producto: "",
        nombre: "",
        descripcion: "",
        tipo: "",
        precio_unitario: null,
        cantidad_disponible: null,
        condiciones: "",
      };
    },
  },
};
</script>

<style scoped>
.form-producto {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  max-width: 600px;
}
.form-group {
  margin-bottom: 1rem;
}
input,
select,
textarea {
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.btn-guardar {
  background-color: #2196f3;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
