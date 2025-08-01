<template>
  <div
    class="dialog-box"
    :class="showPhotoDialog ? 'show-dialog' : 'hide-dialog'"
  >
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    showPhotoDialog: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dialog-box {
  width: 0;
  height: 0;
  opacity: 0;
  z-index: 9999;
  position: fixed;
  transition: all 1s;
  background: pink;
}
.show-dialog {
  top: 0;
  left: 0;
  opacity: 1;
  width: 100vw;
  height: 100vh;
  transition: all 1s;
}
// .hide-dialog {
//   width: 0;
//   height: 0;
//   opacity: 0;
// }
</style>
