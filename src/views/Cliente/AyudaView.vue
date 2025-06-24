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
  max-width: 900px;
  margin: auto;
  color: #2c3e50;
}

.ayuda h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  text-align: center;
}

.ayuda p {
  text-align: center;
  color: #555;
  margin-bottom: 2rem;
}

.faq {
  background-color: #eef1f8;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.faq h3 {
  color: #2e3a59;
  margin-bottom: 1rem;
}

.faq li {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.contacto {
  background: linear-gradient(to right, #a18cd1, #fbc2eb);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.contacto h3 {
  color: white;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
}

textarea {
  resize: none;
}

button {
  background-color: #2c3e50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1a253a;
}
</style>
