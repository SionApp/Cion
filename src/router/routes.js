import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { authGuard } from "../middleware/auth-guard";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    requiresAuth: true,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true, title: "home" },
        beforeEnter: authGuard,
      },
      /*
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/DashboardPage.vue"),
        meta: { requiresAuth: true },
      },
      */
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/ProfilePage.vue"),
        meta: { requiresAuth: true, title: "profile" },
      },

      {
        path: "events",
        name: "events",
        component: () => import("pages/EventsPage.vue"),
        meta: { requiresAuth: true, title: "events" },
      },
      {
        path: "add-musician",
        name: "add-musician",
        component: () => import("pages/MusicianPage.vue"),
        meta: { requiresAuth: true, title: "add-musician" },
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
        meta: { title: "login" },
      },
    ],
  },
  {
    path: "/register",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
        meta: { requiresGuest: true, title: "register" },
      },
    ],
  },
  {
    path: "/forgot-password",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "forgot-password",
        component: () => import("pages/ForgotPasswordPage.vue"),
        meta: { requiresGuest: true, title: "forgot-password" },
      },
    ],
  },
  {
    path: "/select-role",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "select-role",
        component: () => import("pages/SelectRolePage.vue"),
        meta: { requiresGuest: true, title: "select-role" },
      },
    ],
  },
  {
    path: "/onboarding",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "onboarding",
        component: () => import("pages/OnboardingPage.vue"),
        meta: { requiresGuest: true, title: "onboarding" },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default routes;
