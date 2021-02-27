<template> 
  <div id="layout-main" :class="[!collapsed? 'open': 'close']">
    <router-view />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: 'Main',
  setup() {
    const store = useStore();
    const collapsed = computed(() => store.state.app.iscollapsed);
    return {
      collapsed
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-main {
  position: fixed;
  top: 75px;
  // left: $menuWidth;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  transition: all ease 0.3s;
  padding: 30px;
  overflow: scroll;
  &.open {
    left: $menuWidth;
  }
  &.close {
    left: $menuMinWidth;
  }
}

</style>