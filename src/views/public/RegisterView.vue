<template>
  <div class="register-page">
    <div class="register-box">
      <RegisterForm />
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  },
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top right, #e5f9e7, #ffffff);
}

.register-box {
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
