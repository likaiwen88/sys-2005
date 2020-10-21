<template>
  <div class="login-page">
    <video id="bg-video" autoplay muted loop>
      <source src="./../../../bg_video.d2d602a9.mp4" type="video/mp4" />
    </video>
    <div class="login-container">
      <h2>第一个管理系统</h2>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//登录逻辑实现
//1，收集用户输入的username  password传递给后端

//2，登入通过后，将后端返回的token存到本地，跳转到主页
//3,每次请求的时候，携带token到请求头 authorization
//4,展示token校验正确的数据
//5，校验不通过，跳转到登入页
import { login } from "@/api";
import { mapMutations } from "vuex";

export default {
  data() {
    //jsDoc
    /*@param {object} rule 就是一个表单验证对象
        @param {String} value 输入值
        @param {Function} callback校验通过不传参 不通过传参
      */
    var validateUsername = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback("4到16位（字母，数字，下划线，减号）");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登录...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          //代表本地校验通过
          //发送登入请求
          login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              //服务器响应，关闭loading动画
              loading.close();

              if (res.data.state) {
                this.$message.success("登录成功");
                //用户名密码正确
                localStorage.setItem("qf2005-token", res.data.token);
                localStorage.setItem(
                  "qf2005-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中state['userinfo']的值
                this.SET_USERINFO(res.data.userInfo);

                //跳转到主页
                this.$router.push("/");
              } else {
                //用户名或者密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
h2 {
  text-align: center;
  /* margin-top: 50px; */
}
/* 表单样式 */
.el-form {
  width: 400px;
  padding-top: 50px;
  padding-bottom: 80px;
  text-align: center;
}
.login-container {
  padding-top: 80px;
  width: 420px;
  position: relative;
  top: 80px;
  left: 580px;
  /* background: royalblue; */
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
#bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -10;
  background-size: cover;
}
</style>
