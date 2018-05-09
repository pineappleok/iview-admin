<style lang="less">
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
</style>
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
                                产品创建
                            </MenuItem>
                            <MenuItem name="2">
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
        <div class="main-header-con" :style="{paddingLeft: !sidebarPage?'0':(shrink?'60px':'200px')}">
            <div class="main-header">
                <div class="navicon-con" v-if="sidebarPage">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
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
                sidebarPage:false,
                shrink: true,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
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
            },
            openedSubmenuArr () {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }
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
