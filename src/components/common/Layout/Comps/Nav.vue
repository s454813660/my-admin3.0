<template>
  <div id="layout-nav">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :inline-collapsed="collapsed"
      class="nav-menu"
    >
      <a-menu-item key="1">
        <PieChartOutlined />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <DesktopOutlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <InboxOutlined />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span><MailOutlined /><span>Navigation One</span></span>
        </template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span><AppstoreOutlined /><span>Navigation Two</span></span>
        </template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
          <a-menu-item key="12">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { ref, reactive, watch, toRefs } from "vue";
export default {
  name: 'Nav',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup() {
    // data
    const collapsed = ref(false);
    /**
     * 暂时不清楚为什么一定要ref声明才不会有bug，reactive声明toRefs也会有warning
     */
    const selectedKeys = ref(["1"]);
    const openKeys = ref(["sub1"]);
    const preOpenKeys = ref(["sub2"]);
    
    // methods

    //watch
    return {
      collapsed,
      selectedKeys,
      openKeys,
      preOpenKeys,
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-nav {
  width: 250px;
  background-color: #344a5f;
  height: 100vh;
  :deep() .nav-menu {
    background-color: transparent;
    .ant-menu-sub{
      background-color: transparent;
    };
    .ant-menu-item {
      width: 100%;
      &::after {
        display: none;
      }
    };
  }
  .ant-menu-item-selected {
    background-color: #f56c6c;
  }
}
</style>