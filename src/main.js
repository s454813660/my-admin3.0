import { createApp } from "vue/dist/vue.runtime.esm-bundler";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button,
         DatePicker,
         Row,
         Col,
         Form,
         Modal,
         Select,
         Input,
         Menu,
         Table,
         Pagination,
         Switch,
         Spin,
         ConfigProvider,
         Upload,
         Radio,
         Checkbox
        } from "ant-design-vue";
import SvgIcon from "@/components/SvgIcon";
import "@/components/content/icons";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Button)
  .use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Form)
  .use(Modal)
  .use(Select)
  .use(Input)
  .use(Menu)
  .use(Table)
  .use(Pagination)
  .use(Switch)
  .use(Spin)
  .use(ConfigProvider)
  .use(Upload)
  .use(Radio)
  .use(Checkbox)
  .component("svg-icon", SvgIcon)
  .mount("#app");
