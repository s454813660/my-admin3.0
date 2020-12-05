<template>
  <div id="layout">
    <LayoutNav />
    <LayoutHeader />
    <LayoutMain />
  </div>
</template>
<script>
import LayoutNav from "./Comps/Nav";
import LayoutHeader from "./Comps/Header";
import LayoutMain from "./Comps/Main";
export default {
  name: 'Layout',
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutMain
  }
}
</script>
<style lang="scss" scoped>
</style>
