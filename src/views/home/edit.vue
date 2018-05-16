<template>
	<div class="home-main">
		<div class="main-header">
			<span class="back">返回</span>
			<button>保存</button>
		</div>
		<div class="main-content home-edit">
			<div class="home-edit-con">
				<div class="fl">
					<div class="row">
						<span class="label">产品型号</span><input type="text" placeholder="请输入产品型号名称..." /></div>
					<div class="row">
						<span class="label">产品型号ID</span>32154756879fdjshsdk</div>
					<div class="row">
						<span class="label">产品行业</span>智慧农业</div>
					<div class="row">
						<span class="label">连接方式</span>
						蓝牙</div>
					<div class="row">
						<span class="label">产品备注</span><input type="text" placeholder="产品备注..." /></div>
				</div>
				<div class="fr">
					<div class="row">
						<div class="row">
							<span class="label">设备图片</span>
							<button class="btn">上传文件</button>
						</div>
						<div class="row-pl75">
							<p class="p">支持扩展品：rar、zip、doc、docx、pdf、jpg...</p>
							<img src="http://test.www.yuedujiayuan.com/activity-ui/spring-reading/images/act-student.jpg" alt="" class="img" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "home_edit",
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.home-edit {
  font-size: 14px;
  .home-edit-con {
    width: 83.3%;
    margin: 27px auto;
    padding: 50px 40px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(31, 49, 89, 0.25);
    border-radius: 2px;
  }
  .row,
  .row-p75 {
    color: rgba(23, 35, 61, 0.8);
    text-align: left;
  }
  .row-p75 {
    padding-left: 75px;
  }
  .label {
    display: inline-block;
    width: 75px;
    vertical-align: middle;
    color: rgba(29, 36, 54, 0.8);
    text-align: left;
  }
  input {
    border: 1px solid #dddee1;
    border-radius: 2px;
  }
  .btn {
    width: 72px;
    height: 27px;
    border: 1px solid #008cf8;
    border-radius: 2px;
    text-align: center;
    font-size: 12px;
    color: #008cf8;
  }
  p {
    font-size: 12px;
    color: rgba(28, 36, 56, 0.55);
    text-align: left;
  }
  .img {
    width: 158px;
    height: 158px;
  }
}
</style>