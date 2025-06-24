<template>
  <div class="admin-usuarios">
    <h2>Usuarios registrados 👥</h2>

    <div v-if="usuarios.length === 0">
      <p>No hay usuarios registrados aún.</p>
    </div>

    <table v-else class="tabla-usuarios">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usuarios" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.nombre }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.rol }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdminUsuariosView",
  data() {
    return {
      usuarios: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost/miapi/tables.php?action=users");
      const data = await res.json();
      this.usuarios = data.usuarios || [];
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudieron cargar los usuarios");
    }
  },
};
</script>

<style scoped>
.admin-usuarios {
  padding: 2rem;
}
.tabla-usuarios {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th,
td {
  border: 1px solid #ccc;
  padding: 0.8rem;
  text-align: center;
}
</style>
