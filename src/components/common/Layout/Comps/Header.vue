<template>
  <div id="layout-header" :class="[!collapsed? 'open': 'close']">
    <div class="collapsedIn pull-left header-btn" @click="toggleCollapsed">
      <svg-icon icon-class="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user pull-left">
        <img class="avatar" src="~@/assets/images/avatar.png" alt="">
        <span class="user-name">{{username}}</span>
      </div>
      <div class="closed header-btn pull-left" @click="exit">
        <svg-icon icon-class="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { removeUsername, removeToken } from "@/libs/utils/app";
import { message } from "ant-design-vue";
export default {
  name: 'Header',
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const collapsed = computed(() => store.state.app.iscollapsed);
    const username = computed(() => store.state.app.username)
    const toggleCollapsed = () => {
      store.commit("app/SET_COLLAPSED");
    }

    const exit = () => {
      removeUsername();
      removeToken();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      router.push({
        name: "Login"
      });
      message.success("退出登录！");
      sessionStorage.clear();
    }
    return {
      collapsed,
      username,
      toggleCollapsed,
      exit
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