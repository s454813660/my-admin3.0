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
  background-color: #fff;
  flex: 1;
  margin: 30px 0 0 30px;
}

</style>