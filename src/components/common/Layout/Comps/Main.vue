<template> 
  <div id="layout-main">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Main',
}
</script>
<style lang="scss" scoped>
#layout-main {
  position: absolute;
  top: 75px;
  left: 250px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}

</style>