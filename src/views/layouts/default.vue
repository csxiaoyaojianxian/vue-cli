<template>
  <el-container class="cs-container">
    <el-header>
      <el-row>
        <el-col :span="1"><img class="cs-logo" src="../../assets/avatar.png"></el-col>
        <el-col :span="15"><span class="text-large">CFHD社区管理后台 v2.0</span></el-col>
        <el-col :span="6" class="ellipsis">当前用户：<span>{{userInfo.name}}</span></el-col>
        <el-col :span="2"><el-button type="danger" id="dologout">注销</el-button></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- menu -->
      <el-aside width="200px">
        <el-row class="tac cs-menu">
          <el-col :span="24">
            <el-menu
              default-active="1"
              :router="true"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              
              <el-menu-item index="1" route="/dashboard">
                <i class="el-icon-document"></i>
                <span slot="title">数据统计</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-edit"></i>
                  <span>内容配置</span>
                </template>
                <el-menu-item index="2-1" route="/content/forum">
                  <i class="el-icon-setting"></i>
                  <span slot="title">话题</span>
                </el-menu-item>
                <el-menu-item index="2-2" route="/content/thread">
                  <i class="el-icon-setting"></i>
                  <span slot="title">帖子</span>
                </el-menu-item>
                <el-menu-item index="2-3" route="/content/post">
                  <i class="el-icon-setting"></i>
                  <span slot="title">回复</span>
                </el-menu-item>
                <el-menu-item index="2-4" route="/content/comment">
                  <i class="el-icon-setting"></i>
                  <span slot="title">评论</span>
                </el-menu-item>
                <el-menu-item index="2-5" route="/content/thumb">
                  <i class="el-icon-setting"></i>
                  <span slot="title">点赞</span>
                </el-menu-item>
              </el-submenu>

              <el-menu-item index="3" route="/user">
                <i class="el-icon-date"></i>
                <span slot="title">用户配置</span>
              </el-menu-item>
              <el-menu-item index="4" route="/auth">
                <i class="el-icon-share"></i>
                <span slot="title">权限配置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- page -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

/* eslint-disable */
export default {
  data () {
    return {
      data: [],
      userInfo:{
        name:'',
        uin:''
      }
    }
  },
  created () {
    // 获取用户信息
    milo.ready( () => {
      need("biz.login", (LoginManager)=> {
        LoginManager.getNickName((u)=>{
          if(u.isLogin){
            this.userInfo.name = u.nickName;
          }
        });
      });
      milo.addEvent(g("dologout"), "click", function () {
        need("biz.login", function (LoginManager) {
          LoginManager.logout(function(){
            window.location.href = "login.html"
          });
        });
        return false;
      });
    });
  },
  methods: {
    // 左侧菜单的开关响应
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
.cs-container {
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  .cs-menu {
    width:100%;
    li {
      width: 200px;
    }
  }
  .cs-logo {
    vertical-align: middle;
    width: 40px;
    margin-bottom: 7px;
  }
}

.el-header, .el-footer {
  background-color: rgb(84, 92, 100);;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

/* element样式全局修改 */
.el-menu {
  text-align: left;
  height: 100%;
}
.el-table th {
  text-align: center;
}
.el-pagination {
  margin-top: 10px;
}
</style>
