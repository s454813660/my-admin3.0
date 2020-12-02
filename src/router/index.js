import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin"),
    children: [
      {
        path: "/admin/index",
        name: "Console",
        component: () => import("@/views/Console")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
