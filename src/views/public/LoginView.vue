<template>
  <div class="login-page">
    <div class="login-box">
      <h2>¡Bienvenido de nuevo!</h2>
      <p>Ingresá tus datos para continuar tu viaje 🚀</p>

      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top right, #cde6f5, #ffffff);
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
  color: #2e3a59;
}

p {
  color: #555;
  margin-bottom: 1.5rem;
}
</style>
