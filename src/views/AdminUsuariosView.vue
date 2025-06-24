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
  font-family: "Montserrat", sans-serif;
  background-color: #f9f9fb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 2rem auto;
  color: #4a4a4a;
  border: 1px solid #d1d9e6; /* borde suave para todo el contenedor */
}

.admin-usuarios h2 {
  font-size: 2rem;
  color: #33475b;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 1.2px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.tabla-usuarios {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3cfd9; /* borde suave para la tabla */
}

.tabla-usuarios thead th {
  background-color: #556b8a;
  color: white;
  padding: 1rem 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-right: 1px solid #485a7a;
}

.tabla-usuarios thead th:last-child {
  border-right: none;
}

.tabla-usuarios tbody td {
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  vertical-align: middle;
  background-color: #fdfdfd;
  border-radius: 6px;
  border: 1px solid #e1e7f0; /* borde suave en cada celda */
  color: #4a4a4a;
}

.tabla-usuarios tbody tr {
  transition: background-color 0.25s ease;
  border-radius: 6px;
  display: table-row; /* para mantener el diseño correcto */
}

.tabla-usuarios tbody tr:hover {
  background-color: #e9f0ff;
  box-shadow: 0 2px 10px rgba(52, 93, 184, 0.15);
  cursor: pointer;
}

/* Primera columna centrada y con color */
.tabla-usuarios tbody td:first-child {
  text-align: center;
  font-weight: 700;
  color: #33475b;
}

/* Responsive para móviles */
@media (max-width: 600px) {
  .admin-usuarios {
    padding: 1rem;
  }
  .tabla-usuarios {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
