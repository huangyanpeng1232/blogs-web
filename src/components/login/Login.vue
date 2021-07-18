<template>
<div id="Login">
<div class="container">
  <div class="row">
    <div class="login">
      <div class="login-form-div col-md-5 col-xs-10 col-sm-8 col-xs-offset-1 col-sm-offset-2 col-md-offset-0">
        <div class="login-form text-center">
          <h1>在线客服系统</h1>
          <input type="text" class="account-input" placeholder="用户名">
          <input type="password" class="account-input"  placeholder="密码">
          <input type="button" class="account-login" @click="login()" value="登录">
          <p class="service-agreement">我同意并遵守服务协议</p>
        </div>
      </div>
      <div class="login-view-div col-md-7 hidden-sm hidden-xs">
        <img src="~@/assets/images/loginHome.svg">
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Login",
  methods:{
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    login(){
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
#Login{
  background-color: #f7fafc;
  height: 100vh;
}
.login{
  margin-top: 120px;
  border-radius: 7px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
  max-width: 1280px;
  overflow: hidden;
  background-color: white;
}
.login-form-div{
  padding: 60px;
}
.login-form{
  margin-top: 10px;
}
.login-form h1{
  font-size: 30px;
  line-height: 30px;
  font-weight: 800;
}
.account-input{
  --placeholder-opacity: 1;
  color: rgba(113,113,122,var(--placeholder-opacity));
  background-color: #f7fafc;
  width: 100%;
  padding: 15px 25px;
  padding-bottom: 10px;
  font-size: 16px;
  border: 1px solid #edf2f7;
  border-radius: 8px;
  outline: none;
  margin-top: 22px;
}
.account-input:focus{
  background-color: white;
  --border-opacity: 1;
  border-color: rgba(161,161,170,var(--border-opacity));
}
.account-login{
  border-radius: 8px;
  background-color: #667eea;
  border: 0px;
  color: white;
  font-size: 18px;
  width: 100%;
  margin-top: 22px;
  padding: 15px 25px;
  letter-spacing: 5px;
}
.account-login:focus{
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}
.service-agreement{
  margin-top: 28px;
  color: #777;
}
.login-view-div{
  background-color: #ebf4ff;
  padding: 50px;
}
.login-view-div img{
  width: 100%;
}
</style>