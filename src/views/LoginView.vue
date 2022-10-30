<template>
  <div class="login">
    <div id="loginmain">
    <div id="login_box">
      <h2>登录</h2>
      <div id="form">
        <div id="input_box">
          <input type="text" v-model="username" placeholder="Username">
        </div>
        <div id="input_box">
          <input type="password" v-model="userpass" placeholder="Password">
        </div>
      </div>
      <button id="sign_in" style="height:30px;" @click="login">登录</button>
      <div id="sign_up">
        <a href="#" style="color:white;">忘记密码?</a>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/index.js'
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      userpass: '',
      user: []
    }
  },
  mounted() {
    getData('user').then((res) => {
      // console.log(res.data[0])
      this.user = res.data[0]
    })
  },
  methods: {
    login () {
      if (this.user.username === this.username && this.user.password === this.userpass) {
        axios.request({
          method: 'patch',
          url: 'http://localhost:3000/user/1',
          data: {
            isLogin: true
          }
        }).then(() => {
          alert('登录成功')
          this.$router.push('/')
        })
      } else {
        alert('用户名或密码错误')
      }
    }
  }
}
</script>

<style>
#loginmain {
  background: url('../assets/loginground.png') no-repeat;
  background-size: 100% auto;
}

#login_box {
  width: 20%;
  height: 400px;
  background-color: #00000060;
  margin: auto;
  margin-top: 10%;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

#login_box input,
#login_box button {
  outline: none;
}

#login_box h2 {
  color: #ffffff90;
  margin-top: 5%;
}

#login_box #form #input_box {
  margin-top: 5%;
}

#login_box #form #input_box input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #ffffff;
  background: #ffffff00;
  border-bottom: 2px solid #ffffff;
  padding: 5px 10px;
  margin-top: 10px;
}

#login_box button {
  margin-top: 50px;
  width: 40%;
  height: 20px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-size: 15px;
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  cursor: pointer;
}

#login_box #sign_up a {
  color: #ffffff;
}

</style>
