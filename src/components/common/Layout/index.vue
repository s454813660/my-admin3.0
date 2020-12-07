<template>
  <div id="layout">
    <LayoutNav ref="layoutNav"/>
    <LayoutHeader @toggleCollapsed="toggleCollapsed"/>
    <LayoutMain />
  </div>
</template>
<script>
import LayoutNav from "./Comps/Nav";
import LayoutHeader from "./Comps/Header";
import LayoutMain from "./Comps/Main";
import { provide, ref } from 'vue';
export default {
  name: 'Layout',
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutMain
  },
  setup() {
    const layoutNav = ref(null);
    console.log(layoutNav);
    const collapsed = sessionStorage.getItem("collapsed")?ref(setBoolean(sessionStorage.getItem("collapsed"))): ref(false);
    provide("collapsed", collapsed);
    function toggleCollapsed() {
      collapsed.value = !collapsed.value;
      layoutNav.value.openKeys = layoutNav.value.collapsed ? [] : layoutNav.value.preOpenKeys;
    }

    function setBoolean(str) {
      switch(str) {
        case "true":
          return ref(true).value;
          break;
        case "false":
          return ref(false).value;
          break;
        default:
          break; 
      }
    }
    return {
      toggleCollapsed,
      layoutNav
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
