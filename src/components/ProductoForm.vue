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

    <div class="btn-container">
      <button type="submit" class="btn-guardar">Guardar producto ✨</button>
    </div>
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
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c2c54;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  font-family: inherit;
  background-color: #f9f9f9;
  transition: border 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #7e57c2;
  outline: none;
}

.btn-container {
  text-align: center;
  margin-top: 1.5rem;
}

.btn-guardar {
  background-color: #c084fc;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-guardar:hover {
  background-color: #a855f7;
}

@media (max-width: 640px) {
  .form-producto {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>
