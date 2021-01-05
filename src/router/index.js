import { createRouter, createWebHashHistory } from "vue-router";

const Admin = () => import("@/views/Admin");

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      title: "登陆"
    },
    component: () => import("@/views/Login")
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      title: "控制台",
      icon: "console"
    },
    redirect: "/admin/index",
    component: Admin,
    children: [
      {
        path: "/admin/index",
        name: "Console",
        meta: {
          title: "首页"
        },
        component: () => import("@/views/Console")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      title: "信息管理",
      icon: "info"
    },
    component: Admin,
    redirect: "/admin/infoList",
    children: [
      {
        path: "/admin/infoList",
        name: "InfoList",
        meta: {
          title: "信息列表"
        },
        component: () => import("@/views/Info/InfoList")
      },
      {
        path: "/admin/infoCate",
        name: "InfoCate",
        meta: {
          title: "信息分类"
        },
        component: () => import("@/views/Info/InfoCate")
      },
      {
        path: "/admin/detailEdit",
        name: "DetailEdit",
        hidden: true,
        meta: {
          title: "编辑详情"
        },
        component: () => import("@/views/Info/DetailEdit")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    redirect: "/admin/user",
    component: Admin,
    meta: {
      title: "用户管理",
      icon: "user"
    },
    children: [
      {
        path: "/admin/user",
        name: "User",
        meta: {
          title: "编辑"
        },
        component: () => import("@/views/User"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


/**
 * 路由导航守卫
 */
import { getToken, removeToken, removeUsername } from "@/libs/utils/app";
const whiteRoutes = ["/login"];
router.beforeEach((to, from, next) => {
  if(getToken()) {
    if(to.path === "/login") {
      removeToken();
      removeUsername();
      next();
    }else{
      next();
    }
  }else{
    if(whiteRoutes.indexOf(to.path) !== -1) {
      // console.log(to.path);
      next();
    }else{
      next("/login");
    }
  };
})
export default router;
