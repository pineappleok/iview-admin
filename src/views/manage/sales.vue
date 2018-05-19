<!-- 运维管理-产品销售管理 -->
<template>
  <div class="manage-right manage-sales">
    <div class="top-bar">
      啊，我是头部栏二
    </div>
    <div class="manage-content">
      <div class="content">
        产品销售管理内容<br/>
        产品销售管理内容<br/>
        产品销售管理内容<br/>
        产品销售管理内容<br/>
        产品销售管理内容<br/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manageSales",
  data() {
    return {};
  },
  beforeCreate() {
    // 传值给父级菜单
    this.$emit("set-manage-menu", "sales");
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.manage-sales {
}
</style>
