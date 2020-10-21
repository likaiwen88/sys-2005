<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content bg-purple">哈哈</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <h2>第一个管理系统</h2>
              </div></el-col
            >
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-avatar
                  shape="circle"
                  :size="40"
                  fit="fit"
                  class="tx"
                ></el-avatar>
                &nbsp; &nbsp;
                <span>欢迎您</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                &nbsp; &nbsp;
                <span class="quit" @click="quit">退出</span>
              </div></el-col
            >
          </el-row>
        </el-header>
        <!-- 主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.quit {
  cursor: pointer;
  color: blue;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.tx {
  vertical-align: middle;
  background: skyblue;
}
</style>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登录
      //1,清除token和userinfo
      //2,跳转到登录页
      localStorage.removeItem("qf2005-token");
      localStorage.removeItem("qf2005-userInfo");
      this.$router.push("/login");
    }
  }
};
</script>
