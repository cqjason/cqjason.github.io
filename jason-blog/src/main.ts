import { createApp } from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import plugins from "@/plugins";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(plugins)
  .mount("#app");
