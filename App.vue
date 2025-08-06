<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods:{}
};
</script>

<style lang="scss">
@import "@/static/reset.css";
@import "./static/iconfont/iconfont.css";
uni-page-body,
page {
  height: 100vh; /* 保持旧逻辑 */
  height: calc(var(--real-vh) * 100); /* 优先新逻辑 */
}
/* 强制横屏：竖屏时旋转页面 */
// @media screen and (orientation: portrait) {
//   body {
//     transform-origin: 0 0;
//     transform: rotate(90deg) translateY(-100%);
//     width: 100vh;
//     height: 100vw;
//     overflow: hidden;
//   }
// }
</style>
