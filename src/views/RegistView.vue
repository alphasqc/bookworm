<template>
  <div class="login">
    <div id="loginmain">
      <div id="login_box">
        <h2>注册</h2>
        <div id="form">
          <div id="input_box">
            <input type="text" placeholder="Username" v-model="username" :error-message="usermsg">
          </div>
          <div id="input_box">
            <input type="password" placeholder="Password" v-model="password" :error-message="passmsg">
          </div>
        </div>
        <button id="sign_in" style="height:30px;" @click="regist">注册</button>
      </div>
    </div>
    <test-model v-model="showFlag"></test-model>
  </div>
</template>

<script>
// import { getData } from '@/api/index.js'
import axios from 'axios'
import TestModel from '../components/TestModel.vue'

export default {
  data () {
    return {
      username: '',
      password: '',
      showFlag: true
    }
  },
  mounted () {
  },
  components: {
    TestModel
  },
  methods: {
    regist () {
      if (/^[a-zA-Z0-9_-]{2,8}$/.test(this.username) && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password)) {
        axios.put('http://localhost:3000/user', {
          username: this.username,
          password: this.password
        })
        alert('注册成功')
        this.$router.push('/login')
      } else {
        alert('注册失败,用户名或密码格式错误')
      }
    }
  },
  computed: {
    usermsg () {
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.username)) {
        return '用户名格式错误'
      } else {
        return ''
      }
    },
    passmsg () {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password)) {
        return '密码格式错误'
      } else {
        return ''
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
  margin-top: 25%;
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

#login_box #sign_up {
  margin-top: 45%;
}

#login_box #sign_up a {
  color: #b94648;
}
</style>
