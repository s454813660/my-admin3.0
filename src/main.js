import { createApp } from "vue/dist/vue.runtime.esm-bundler";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import SvgIcon from "@/components/SvgIcon";
import "@/components/content/icons"

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Antd)
  .component("svg-icon", SvgIcon)
  .mount("#app");
