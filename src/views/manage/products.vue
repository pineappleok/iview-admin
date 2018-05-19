<!-- 运维管理-产品库管理 -->
<template>
  <div class="manage-right manage-products">
    <div class="top-bar">
      啊，我是头部栏一
    </div>
    <div class="manage-content">
      <div class="content">
        产品库管理内容<br/>
        产品库管理内容<br/>
        产品库管理内容<br/>
        产品库管理内容<br/>
        产品库管理内容<br/>
        产品库管理内容<br/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manageProducts",
  data() {
    return {};
  },
  beforeCreate() {
    // 传值给父级main.vue（第二个导航）
    this.$emit("set-manage-menu", "products");
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.manage-products {
  
}
</style>
