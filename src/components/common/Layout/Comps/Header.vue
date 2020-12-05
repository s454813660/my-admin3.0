<template>
  <div id="layout-header">
    header
  </div>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style lang="scss" scoped>
#layout-header {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
  z-index: 10;
}
</style>