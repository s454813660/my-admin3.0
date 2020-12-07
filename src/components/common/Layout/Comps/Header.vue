<template>
  <div id="layout-header" :class="[!collapsed? 'open': 'close']">
    <div class="collapsedIn pull-left header-btn" @click="toggleCollapsed">
      <svg-icon icon-class="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user pull-left">
        <img class="avatar" src="~@/assets/images/avatar.png" alt="">
        <span class="user-name">管理员</span>
      </div>
      <div class="closed header-btn pull-left">
        <svg-icon icon-class="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';
export default {
  name: 'Header',
  setup(props, ctx) {
    const collapsed = inject("collapsed");
    function toggleCollapsed() {
      sessionStorage.setItem("collapsed",!collapsed.value);
      ctx.emit("toggleCollapsed");
    };
    return {
      collapsed,
      toggleCollapsed,
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-header {
  position: fixed;
  top: 0;
  // left: $menuWidth;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
  z-index: 10;
  transition: ease 0.3s;
  &.open {
    left: $menuWidth;
  }
  &.close {
    left: $menuMinWidth;
  }
  .user {
    padding-right: 22px;
    border-right: 1px solid #eee;
}
  .avatar, .user-name{
    float: left;
    line-height: 75px;
  }
  .avatar {
    padding: 0 18px;
    margin-top: 18px;
  }
  .header-btn {
    font-size: 17px;
    padding: 0 30px;
    // height: 75px;
    line-height: 75px;
    cursor: pointer;
  }
}
</style>