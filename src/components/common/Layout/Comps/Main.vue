<template> 
  <div id="layout-main" :class="[!collapsed? 'open': 'close']">
    <router-view />
  </div>
</template>
<script>
import {inject} from "vue";
export default {
  name: 'Main',
  setup() {
    const collapsed = inject("collapsed");
    return {
      collapsed
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-main {
  position: absolute;
  top: 75px;
  // left: $menuWidth;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  transition: ease 0.3s;
  &.open {
    left: $menuWidth;
  }
  &.close {
    left: $menuMinWidth;
  }
}

</style>