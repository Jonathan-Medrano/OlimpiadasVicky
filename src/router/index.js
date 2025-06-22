// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/public/HomeView.vue";
import InfoView from "@/views/public/InfoView.vue";
import LoginView from "@/views/public/LoginView.vue";
import RegisterView from "@/views/public/RegisterView.vue";

import PaquetesView from "@/views/Cliente/PaquetesView.vue";
import VehiculosView from "@/views/Cliente/VehiculosView.vue";
import AlojamientosView from "@/views/Cliente/AlojamientosView.vue";
import ActividadesView from "@/views/Cliente/ActividadesView.vue";
import AyudaView from "@/views/Cliente/AyudaView.vue";

import AdminView from "@/views/AdminView.vue";
import AdminUsuariosView from "@/views/AdminUsuariosView.vue";
import PanelProductos from "@/views/PanelProductos.vue";
import AdminComprasView from "@/views/AdminComprasView.vue";
import InsertarProductoView from "@/views/InsertarProductoView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/info", component: InfoView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/paquetes", component: PaquetesView },
  { path: "/vehiculos", component: VehiculosView },
  { path: "/alojamientos", component: AlojamientosView },
  { path: "/actividades", component: ActividadesView },
  { path: "/ayuda", component: AyudaView },
  { path: "/admin", component: AdminView },
  { path: "/admin/usuarios", component: AdminUsuariosView },
  { path: "/admin/productos", component: PanelProductos },
  { path: "/admin/compras", component: AdminComprasView },
  { path: "/admin/insertar", component: InsertarProductoView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
