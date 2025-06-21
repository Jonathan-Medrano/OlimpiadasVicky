<template>
  <div class="ayuda">
    <h2>¿Necesitás ayuda? 🤔</h2>
    <p>Estamos para ayudarte. Revisá las preguntas frecuentes o envianos tu consulta.</p>

    <div class="faq">
      <h3>Preguntas frecuentes</h3>
      <ul>
        <li>
          <strong>¿Cómo reservo un paquete?</strong> Hacé clic en "Agregar al carrito" y luego
          confirmá la compra desde el carrito.
        </li>
        <li>
          <strong>¿Puedo pagar más tarde?</strong> Por ahora solo se puede comprar con pago en el
          momento.
        </li>
        <li>
          <strong>¿Qué pasa si no recibo confirmación?</strong> Contactanos desde el formulario o
          por correo.
        </li>
      </ul>
    </div>

    <div class="contacto">
      <h3>Formulario de contacto</h3>
      <form @submit.prevent="enviarConsulta">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input v-model="nombre" type="text" id="nombre" required />
        </div>
        <div class="form-group">
          <label for="email">Correo:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="mensaje">Mensaje:</label>
          <textarea v-model="mensaje" id="mensaje" rows="4" required></textarea>
        </div>
        <button type="submit">Enviar consulta</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AyudaView",
  data() {
    return {
      nombre: "",
      email: "",
      mensaje: "",
    };
  },
  methods: {
    async enviarConsulta() {
      try {
        const res = await fetch("http://localhost/miapi/enviar_consulta.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: this.nombre,
            email: this.email,
            mensaje: this.mensaje,
          }),
        });
        const data = await res.json();
        if (data.success) {
          alert("Consulta enviada correctamente");
          this.nombre = "";
          this.email = "";
          this.mensaje = "";
        } else {
          alert("No se pudo enviar la consulta");
        }
      } catch (err) {
        console.error(err);
        alert("Error de conexión al enviar el mensaje");
      }
    },
  },
};
</script>

<style scoped>
.ayuda {
  padding: 2rem;
}
.faq {
  margin-bottom: 2rem;
}
.contacto {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 600px;
}
.form-group {
  margin-bottom: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  background-color: #2e3a59;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
