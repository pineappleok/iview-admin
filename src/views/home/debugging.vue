<template>
	<div class="home-main"> 
		<div class="main-header-con">
			<div class="main-header">
				<div class="header-middle-con">
					<span class="back">返回</span>
					<button>保存</button>
				</div>
			</div>
		</div>
		<div class="main-content home-debugging">
			<div class="home-debugging-con">
				<h3>虚拟设备调试流程图</h3>
				<div class="step-1">
					<h4>1.用户通过APP控制硬件</h4>
					<p><img src="../images/debugging_step_1.png" alt="" /></p>
					<h4>2.硬件数据传输到用户APP中</h4>
					<p><span class="inline-title">虚拟设备调试：</span>我们通过模拟硬件设备，做了一个虚拟的设备环境，构成从APP到云到硬件的一个闭循环，可以模拟和检验设备的数据并上传日志，以便用户的更改和完善。</p>
				</div>
				<h3>打开TD-APP扫码启动虚拟设备</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home_edit',
	components: {
	},
	data () {
		return {
		};
	},
	computed: {
	},
	created () {
	},
	mounted () {
	},
	methods: {
	}
};
</script>
<style lang="less" scoped>
.home-debugging{
	font-size:14px;
	.step-1{
		border-bottom:1px solid rgba(23,35,61,0.10);
	}
}
</style>