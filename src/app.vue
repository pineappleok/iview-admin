<template>
    <div id="appMain" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="less">
@import "styles/common.less";
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
.avator-img {
  display: block;
  width: 80%;
  max-width: 100px;
  height: auto;
}
.main-header {
  height: 64px;
  padding: 0 20px;
  background-color: #fff;
}
.mid-content {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f2f3f5;
  z-index: 1;
}
.home-main {
  height: 100%;
}
.main-content {
  position: absolute;
  top: 64px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
}
.main-breadcrumb {
  display: inline-block;
}
</style>
