<template>
  <div id="layout">
    <LayoutNav />
    <div class="left-wrap">
      <LayoutHeader />
      <LayoutMain />
    </div>
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
#layout {
  display: flex;
  background-color: #f7f7f7;
  .left-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>