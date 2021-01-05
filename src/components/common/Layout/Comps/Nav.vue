<template>
  <div id="layout-nav" :class="[!collapsed? 'open': 'close']">
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
            <icon-font :type="`icon-${item.meta.icon}`" style="font-size:1.2em; vertical-align:middle"></icon-font>
            <!-- <svg-icon class="sub-menu-icon" :icon-class="item.meta.icon"></svg-icon> -->
            <span v-if="item.meta">{{item.meta.title}}</span>
          </template>
          <template v-for="subItem in item.children">
            <a-menu-item :key="subItem.path" v-if="!subItem.hidden">{{subItem.meta.title}}</a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { ref, reactive, watch, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2250507_32pzfpxdk9m.js",
})
export default {
  name: 'Nav',
  components: {
    IconFont
  },
  setup() {
    const router = useRouter();
    
    const routes = router.options.routes;
    // console.log(routes)
    // data
    const store = useStore();
    const collapsed = computed(() => store.state.app.iscollapsed);
    /**
     * 暂时不清楚为什么一定要ref声明才不会有bug，reactive声明toRefs也会有warning
     */
    const selectedKeys = ref([routes[2].redirect]);
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
  // width: $menuWidth;
  background-color: #344a5f;
  font-size: 17px;
  transition: ease 0.3s;
  &.open {
    width: $menuWidth;
  }
  &.close {
    width: $menuMinWidth;
  }
  .logo {
    // margin: 31px 90px 22px 90px; 
    width: 100%;
    img {
      margin: 31px auto 22px;
      width: 70px;
      height: 60px;
    }
  }
  .sub-menu-icon {
    margin-right: 10px;
    color: #fff;
  }
}
</style>