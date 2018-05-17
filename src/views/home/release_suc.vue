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
                    <Button type="primary" shape="circle" icon="ios-search" style="width:48px;height:48px;background-image: linear-gradient(-133deg, #57C257 0%, #89D970 89%);
                    box-shadow: 0 4px 8px 0 rgba(90,195,88,0.50);border-color:#fff;"></Button>
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