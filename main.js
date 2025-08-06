import App from "./App";
// 1. 记录原始缩放比例
const baseDPR = window.devicePixelRatio || 1;

// 2. 强制重置 viewport 缩放
const fixViewport = () => {
  const scale = 1 / baseDPR;
  const viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute(
      "content",
      `width=device-width,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`
    );
  }
};

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
