import { createRouter, createWebHistory } from "vue-router";

// Layouts
import LayoutCliente from "@/layouts/LayoutCliente.vue";
// import LayoutAdmin from "@/layouts/LayoutAdmin.vue"; // si querés usarlo

// Público
import HomeView from "@/views/public/HomeView.vue";
import LoginView from "@/views/public/LoginView.vue";
import RegisterView from "@/views/public/RegisterView.vue";

// Cliente
import ClienteInicioView from "@/views/Cliente/ClienteInicioView.vue";
import PaquetesView from "@/views/Cliente/PaquetesView.vue";
import VuelosView from "@/views/Cliente/VuelosView.vue";
import AlquileresView from "@/views/Cliente/AlquileresView.vue";
import AlojamientosView from "@/views/Cliente/AlojamientosView.vue";
import ActividadesView from "@/views/Cliente/ActividadesView.vue";
import AyudaView from "@/views/Cliente/AyudaView.vue";
import PerfilClienteView from "@/views/Cliente/PerfilClienteView.vue";
import CarritoView from "@/views/Cliente/CarritoView.vue";

// Admin
import AdminView from "@/views/AdminView.vue";
import AdminUsuariosView from "@/views/AdminUsuariosView.vue";
import PanelProductosView from "@/views/PanelProductos.vue";
import PanelComprasView from "@/views/PanelCompras.vue";

const routes = [
  // 👉 Público
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },

  // 👉 Cliente (con layout)
  {
    path: "/cliente",
    component: LayoutCliente,
    meta: { rol: "cliente" },
    children: [
      { path: "inicio", name: "clienteInicio", component: ClienteInicioView },
      { path: "paquetes", name: "clientePaquetes", component: PaquetesView },
      { path: "vuelos", name: "clienteVuelos", component: VuelosView },
      { path: "alquileres", name: "clienteAlquileres", component: AlquileresView },
      { path: "alojamientos", name: "clienteAlojamientos", component: AlojamientosView },
      { path: "actividades", name: "clienteActividades", component: ActividadesView },
      { path: "ayuda", name: "clienteAyuda", component: AyudaView },
      { path: "perfil", name: "perfilCliente", component: PerfilClienteView },
      { path: "carrito", name: "carritoCliente", component: CarritoView },
    ],
  },

  // 👉 Admin (sin layout por ahora)
  { path: "/admin", name: "admin", component: AdminView, meta: { rol: "admin" } },
  {
    path: "/admin/usuarios",
    name: "adminUsuarios",
    component: AdminUsuariosView,
    meta: { rol: "admin" },
  },
  {
    path: "/admin/productos",
    name: "panelProductos",
    component: PanelProductosView,
    meta: { rol: "admin" },
  },
  {
    path: "/admin/compras",
    name: "panelCompras",
    component: PanelComprasView,
    meta: { rol: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Protección opcional por rol (puede quitarse)
router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (to.meta.rol === "cliente" && usuario?.rol !== "cliente") {
    return next("/login");
  }

  if (to.meta.rol === "admin" && usuario?.rol !== "admin") {
    return next("/login");
  }

  next();
});

export default router;
