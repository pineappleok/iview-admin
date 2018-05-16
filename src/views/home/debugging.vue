<template>
	<div class="home-main"> 
		<div class="main-header-con">
			<div class="main-header">
		      <div class="breadcrumb">
		        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
		      </div>
		      <top-timeline :cur-step="3" />
		      <div class="action">
		        <Button type="primary">下一步</Button>
		      </div>
			</div>
		</div>
		<div class="main-content">
			<left-info :product-info="productInfo" />
			<div class="content">
				<div class="home-debugging-con">
					<h3>虚拟设备调试流程图</h3>
					<div class="step-1">
						<h4>1.用户通过APP控制硬件</h4>
						<p class="img_container"><img :src="step1Url" alt="" class="img" /></p>
						<h4>2.硬件数据传输到用户APP中</h4>
						<p><span class="inline-title">虚拟设备调试：</span>我们通过模拟硬件设备，做了一个虚拟的设备环境，构成从APP到云到硬件的一个闭循环，可以模拟和检验设备的数据并上传日志，以便用户的更改和完善。</p>
					</div>
					<h3>打开TD-APP扫码启动虚拟设备</h3>
					<p class="img_container"><img :src="step2Url" alt="" class="img" /></p>	
				</div>
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
			step1Url: require("../../images/debugging_step_1.png"),
			step2Url: require("../../images/debugging_step_2.jpg")
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
	.home-debugging-con{
		padding:25px 2%;
		background:#fff;
		.step-1{
			padding-bottom:20px;
			border-bottom:1px solid rgba(23,35,61,0.10);
			margin-bottom:25px;
			h4{
				padding:20px 0;
				text-align: center;
				font-size: 16px;
				color: #14233F;
			}
		}
		.img_container{
			text-align: center;
			.img{
				display:inline-block;
				width:70%;
			}
		}
	}
}
</style>