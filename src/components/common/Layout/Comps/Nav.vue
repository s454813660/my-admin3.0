<template>
  <div id="layout-nav">
    <div class="logo">
      <img src="https://cn.vuejs.org/images/logo.png" alt="">
    </div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inline-collapsed="collapsed"
      class="nav-menu"
      @click="toggleMenu($event)"
    >
      <template v-for="item in routes">
        <a-sub-menu v-if="!item.hidden" :key="item.path">
          <template #title>
            <DashboardOutlined />
            <span v-if="item.meta">{{item.meta.title}}</span>
          </template>
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">{{subItem.meta.title}}</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { ref, reactive, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: 'Nav',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MenuOutlined,
    DashboardOutlined,
    AppstoreOutlined,
  },
  setup() {
    const router = useRouter();
    const routes = router.options.routes;
    // data
    const collapsed = ref(false);
    /**
     * 暂时不清楚为什么一定要ref声明才不会有bug，reactive声明toRefs也会有warning
     */
    const selectedKeys = ref(["/admin/index"]);
    const openKeys = ref([routes[2].path]);
    const preOpenKeys = ref([routes[2].path]);
    
    // methods
    function toggleMenu(e) {
      const currentRoute = e.key;
      router.push(currentRoute);
    }
    //watch
    return {
      collapsed,
      selectedKeys,
      openKeys,
      preOpenKeys,
      toggleMenu,
      routes
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #344a5f;
  font-size: 17px;
  .logo {
    margin: 31px 90px 22px 90px;
    img {
      width: 70px;
      height: 60px;
    }
  }
}
</style>