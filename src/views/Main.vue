<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="top-header">   
            <Menu mode="horizontal" active-name="1">
                <Row>
                    <Col span="4">
                        <div class="layout-logo"><img src="../images/logo.png" alt=""></div>
                    </Col>
                    <Col span="16" style="text-align:center;">
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <router-link to="/home" tag="span">产品创建</router-link>
                            </MenuItem>
                            <MenuItem name="2" to="home/set">
                                运维管理
                            </MenuItem>
                            <MenuItem name="3">
                                运营分析
                            </MenuItem>
                            <MenuItem name="4">
                                开发文档
                            </MenuItem>
                        </div>
                    </Col>
                    <Col span="4" style="text-align:right;">
                        <div class="header-avator-con">
                            <div class="search"><Icon type="search" :size="20" style="margin-right:10px;color:#fff;vertical-align:middle;"></Icon></Button></div>
                            <message-tip v-model="mesCount"></message-tip>
                            <div class="user-dropdown-menu-con">
                                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                    <Avatar :src="avatorPath" style="background: #619fe7;margin-right: 10px;"></Avatar>
                                    <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                        <a href="javascript:void(0)">
                                            <Icon type="chevron-down" :size="14"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Menu>
        </div>
        <div v-if="sidebarPage" class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <scroll-bar ref="scrollBar">
                <shrinkable-menu 
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme" 
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <div slot="top" class="logo-con">
                        <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                        <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
                    </div>
                </shrinkable-menu>
            </scroll-bar>
        </div>
        <div class="main-header-con" :style="{paddingLeft: !sidebarPage?'0':(this.shrink?'60px':'200px')}">
            <div class="main-header">
                <div class="navicon-con" v-if="sidebarPage">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div v-if="!childData.isHome" class="header-middle-con" :style="{left: sidebarPage?'60px':'0'}">
                    <Row>
                        <Col span="6">
                            <div class="main-breadcrumb">
                                <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                            </div>
                        </Col>
                        <Col span="16">
                            <ul class="top_timeline">
                                <li v-for="(item,index) in progress" :class="{active:index<=childData.progressActiveIndex,current:index==childData.progressActiveIndex}">
                                    <span class="timeline_icon">{{index+1}}</span>
                                    <br />
                                    <span class="timeline_text">{{item.text}}</span>
                                </li>
                            </ul>
                        </Col>
                        <Col span="2" style="text-align:right;"><Button size="large" type="primary">下一步</Button></Col>
                    </Row>
                </div>
                <div v-else class="main-search">
                    <Row>
                        <Col span="2">&nbsp;</Col>
                        <Col span="22">
                            <Row>
                                <Col :lg="4" :md="8">
                                    <Select v-model="productType" style="width:200px">
                                        <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col :lg="13":md="2">&nbsp;</Col>
                                <Col :lg="7" :md="14" style="text-align:right;">  
                                    <Input v-model="productName" icon="ios-search" placeholder="输入产品名称搜索..." style="width: 220px"></Input>
                                    <Button type="primary" icon="plus" @click="ModalCreateProduct = true">创建新产品</Button>
                                    <Modal v-model="ModalCreateProduct" class="modal"
                                        title="产品创建"
                                        @on-ok="ok"
                                        @on-cancel="cancel">
                                        <Row class="mtb15">
                                            <Col class="label" span="5">产品行业</Col>
                                            <Col span="19">
                                                <Select placeholder="请选择产品行业..." size="large">
                                                    <Option v-for="item in industryList" :value="item.value" :key="item.value"></Option>
                                                </Select>
                                            </Col>
                                        </Row> 
                                        <Row class="mtb15">
                                            <Col class="label" span="5">产品名称</Col>
                                            <Col span="19">
                                                <Input v-model="poductNameModal" placeholder="请输入产品名称..." size="large"></Input>
                                            </Col>
                                        </Row>
                                        <Row class="mtb15">
                                            <Col class="label" span="5">连接方式</Col>
                                            <Col span="19">       
                                                <span v-for="item in connectionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>  
                                            </Col>
                                        </Row>
                                    </Modal>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div v-if="tagsShow" class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: !sidebarPage?'0':(this.shrink?'60px':'200px')}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view :home="childData" @childChange="isChildChanged"></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import scrollBar from '@/views/my-components/scroll-bar/vue-scroller-bars';
    
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch,
            scrollBar
        },
        data () {
            return {
                stage: ['功能设置', '设置APP界面', '虚拟设备调试', '发布产品'],
                poductNameModal: '',
                productName: '',
                ModalCreateProduct: false,
                productType: '',
                productList: this.mockProductListData(),
                industryList: this.mockIndustryListData(),
                connectionList: this.mockConnectionListData(),
                childData: {
                    progressActiveIndex: 0,
                    isHome: false
                },
                sidebarPage: false,
                tagsShow: false,
                shrink: true,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            progress () {
                let data = [];
                for (let i = 0; i < this.stage.length; i++) {
                    data.push({
                        text: this.stage[i]
                    });
                }
                return data;
            },
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            ok () {
                this.$Message.info('已确认');
            },
            cancel () {
                this.$Message.info('已取消');
            },
            isChildChanged (data) {
                Object.assign(this.childData, data);
                console.log('isHOmeCHange');
                console.log(this.childData);
            },
            mockProductListData () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        value: '个人产品' + (i + 1),
                        label: '个人产品' + (i + 1)
                    });
                }
                return data;
            },
            mockIndustryListData () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        value: '产品行业' + (i + 1),
                        label: '产品行业' + (i + 1)
                    });
                }
                return data;
            },
            mockConnectionListData () {
                let connectionType = ['蓝牙', 'WiFi', 'Zigbee', 'Lore', '2G/3G/4G/5G', '网关'];
                let data = [];
                for (let i = 0; i < connectionType.length; i++) {
                    data.push({
                        value: connectionType[i],
                        label: connectionType[i],
                        checked: false
                    });
                }
                return data;
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            scrollBarResize () {
                this.$refs.scrollBar.resize();
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }/*,
            openedSubmenuArr () {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }*/
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.scrollBarResize);
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        },
        dispatch () {
            window.removeEventListener('resize', this.scrollBarResize);
        }
    };
</script>
<style lang="less" scoped> 
@import "./main.less";   
.ivu-menu-light{
    height: 64px;
    background:linear-gradient(to bottom, #2945CB, #2C83F9);
}
.layout-logo{
    width: 304px;
    height: 66px;
    float: left;
    position: relative;
    top: 10px;
    left: 16px;
    img{
        width:155px;
        height: 40px;
    }
}
.layout-nav{
    text-align: center;
}
.ivu-menu-horizontal{
    .ivu-menu-item,.ivu-menu-submenu{
        float:none;
        display:inline-block;
    } 
}
.ivu-menu-light.ivu-menu-horizontal{
    .ivu-menu-item,.ivu-menu-submenu{
        color:rgba(255,255,255,0.8);
    }
    .ivu-menu-item-active,.ivu-menu-item:hover,.ivu-menu-submenu-active,.ivu-menu-submenu:hover{
    color:#fff;
    }
}
.top-header .header-avator-con .message-con {
    display: inline-block;
    width: 30px;
    margin-right: 90px;
    text-align: center;
    cursor: pointer;
}
.top-header .header-avator-con .message-con i {
  vertical-align: middle;
}
.top-header .header-avator-con .user-dropdown-menu-con {
  position: absolute;
  right: 14px;
  top: 0;
  width: 150px;
  height: 100%;
}
.top-header .header-avator-con .user-dropdown-menu-con .main-user-name {
  display: inline-block;
  width: 80px;
  word-break: keep-all;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
.top-header .search{
    display: inline-block;
}
.top-header .ivu-btn-primary{
    background:transparent;
    border:none;
}
.main-search{
    padding-top: 14px;
    .ivu-input-icon-normal+.ivu-input{
        padding-right: 7px;
        padding-left: 32px;
    }
    .ivu-input-icon{
        right: initial;
        left: 0;
    }
}
.modal{
    .mtb15{
        margin-top: 15px;
        margin-bottom: 15px;       
    }
    .label{
        line-height:34px;
        font-size: 14px;
        color: rgba(29,36,54,0.80);
        font-weight: bold;
        text-align: center;
    }
    .check_a{
        display:inline-block;
        height:34px;
        line-height: 34px;
        padding:0 5px;
        border-radius:3px;
        border:1px solid #DDDEE1;
        margin-right:6px;
        margin-bottom:5px;
        font-size:14px;
        text-align: center;
        color: rgba(23,35,61,0.80);
        vertical-align:middle;
        cursor: pointer;
        &.checked{
            border-color:#008CF8;
            color: #008CF8;
        }
        &_icon{
            padding-right:6px;
            font-size:20px;
        }
    }
}
.top_timeline{
    margin:0 auto;
    list-style-type: none;
    text-align: center;
    li{
        position: relative;
        width:160px;
        height: 54px;
        float: left;
        text-align: center;
        &.active{
            & .timeline_icon{
                border-color:#008CF8;
                color:#008CF8;
            }
            &:after{
                border-color:#008CF8;
            }
        }
        &.current{
            border-bottom:2px solid #008CF8;
            & .timeline_text{
                font-weight:bold;
                color:#008CF8;
            }
        }
    }
}
.top_timeline .timeline_icon{
    position: relative;
    display: inline-block;
    width:27px;
    height: 27px;
    background:#fff;
    border: 1px solid rgba(23,35,61,0.25);
    border-radius: 50%;
    line-height:27px;
    color: rgba(23,35,61,0.25);
    ont-family: HelveticaNeue-Medium;
    font-size: 13px;
    font-weight:bold;
}
.top_timeline li:first-child .timeline_icon{
}
.top_timeline .timeline_text{
    display:inline-block;
    font-size: 12px;
    color: rgba(23,35,61,0.25);
    letter-spacing: 0;
    text-align: center;
    line-height: 22px;
}
.top_timeline li:after{
    content:"";
    position: absolute;
    top:13px;
    left: 93px;
    width:160px;
    height:0;
    border-top:1px dashed rgba(23,35,61,0.10);
    z-index:0;
}
.top_timeline li:last-child:after{
    display:none;
}
</style>