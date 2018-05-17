<template>
	<div class="home-main"> 
		<div class="main-header-con">
			<div class="main-header">
		      <div class="breadcrumb">
		        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
		      </div>
		      <top-timeline :cur-step="4" />
		      <div class="action">
		        <Button type="primary" @click="pageToPrev">上一步</Button>
		      </div>
			</div>
		</div>
		<div class="main-content">
			<left-info :product-info="productInfo" />
			<div class="content">
				<div class="home-debugging-con">
					<h3>发布产品<ul class="sub_title"><li>01：提交申请</li><li>02：审核产品</li><li>03：发布完成</li></ul></h3>
					<div class="clearfix">
						<div class="fl">
							<h4>个人用户发布</h4>
							<div class="list">								
								<p>正式服务器</p>
								<p>设备总数限制100台</p>
								<p>API不限正式服务器</p>
								<p>无合作渠道</p>
								<p>无法查看运维及运营分析内容</p>
							</div>
							<div class="btn-container">
								<Button type="primary" size="large" style="width:120px;" @click="pageToSuc">个人发布</Button>
							</div>
							<div>
								<!-- <Tree :data="data4" show-checkbox multiple></Tree> -->
							</div>
						</div>
						<div class="fr">
							<h4>企业用户发布</h4>
							<div class="list">
								<p>正式生产服务器，独立云端运行环境</p>
								<p>不限制，具体按照购买的套餐服务稳定</p>
								<p>API不限制调用接口</p>
								<p>提供其他产品合作渠道</p>
								<p>享受运营分析和运维分析双向福利</p>
							</div>
							<div class="btn-container">
								<Button type="primary" size="large" style="width:120px;height:40px;">企业发布</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import breadcrumbNav from "../main-components/breadcrumb-nav.vue";
import topTimeline from "../my-components/top-timeline";
import leftInfo from "../my-components/left-info";
export default {
	name: 'home_publish',
	components: {
    breadcrumbNav,
    "top-timeline": topTimeline,
    "left-info": leftInfo
	},
	data () {
		return {
      productInfo: {
        id: 23446,
        name: "智能冷暖白光灯1(CW)",
        avator:
          "http://test.www.yuedujiayuan.com/activity-ui/spring-reading/images/act-student.jpg"
      },
	  step1Url: require("../../images/debugging_step_1.png"),
	  step2Url: require("../../images/debugging_step_2.jpg")
	  };
	},
	computed: {
	    currentPath() {
	      return this.$store.state.app.currentPath; // 当前面包屑数组
	    }
	},
	created () {
	},
	mounted () {
	},
	methods: {
    // 跳上一步骤页面
    pageToPrev() {
      this.$router.go(-1);
    },
    // 跳提交成功页面
    pageToSuc() {
      this.$router.push("/home/releaseSuc");
    }
	}
};
</script>
<style lang="less" scoped>
.home-debugging-con{
	font-size:14px;
	padding:25px 2%;
	background:#fff;	
  .fl {
    width: 50%;
    float: left;
    height:570px;
		margin-top:20px;
		.list p,.btn-container{
			background: rgba(20,35,63,0.04);
		}
  }
  .fr {
  	position: relative;
    width: 50%;
    float: right;
    height:570px;
    margin-top:20px;
	}
  h4{
  	padding:15px 40px;
    border-bottom:1px solid rgba(23,35,61,0.10);
    font-size: 14px;
		color: #17233D;
	}
	.list{
		p{
			padding:0 40px;
			border-bottom:1px solid rgba(23,35,61,0.10);
			line-height: 56px;
			font-size: 14px;
			color: rgba(28,36,56,0.80);
		}
	}
	.btn-container{
		padding:22px 40px;
	}
	.img_container{
		text-align: center;
		.img{
			display:inline-block;
			width:70%;
		}
	}
	.sub_title{
		margin-left:25px;
		display:inline-block;
		list-style-type:none;
		li{
			display:inline-block;
			margin-right:10px;
			font-size: 12px;
			color: rgba(23,35,61,0.55);
		}
	}
}
</style>