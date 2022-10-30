<template>
  <div id="dao">
    <div id="nav" v-if="!$route.meta.isshow">
      <nav id="nav1">
        <router-link to="/home">
          <svg t="1656904597343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="15198" width="13" height="13">
            <path
              d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z"
              p-id="15199" fill="#d81e06"></path>
          </svg>
          阿里妈妈首页
        </router-link>
        <template v-if="user.isLogin">
          <router-link to="/user" style="color:red">欢迎你，{{ user.username }}</router-link>
          <button @click="loginOut">注销</button>
        </template>
        <template v-else>
          <router-link to="/login">请登录</router-link>
          <router-link to="/regist">免费注册</router-link>
        </template>
      </nav>
      <nav id="nav2">
        <!-- <button @click="test">数据</button> -->
        <router-link to="/cart">购物车</router-link>
        <router-link to="/order">我的订单</router-link>
        <router-link to="/user">个人中心</router-link>
      </nav>
    </div>
  </div>
  <router-view />
</template>

<script>
import { getData } from '@/api/index.js'
import axios from 'axios'
export default {
  methods: {
    loginOut() {
      this.$store.commit('loginOut')
      window.sessionStorage.removeItem('userInfo')
      this.user.isLogin = false
      axios.patch('http://localhost:3000/user/1', {
        isLogin: false
      })
      location.reload()
    },
    test () {
      window.open('http://localhost:3000/user')
    }
  },
  mounted() {
    getData('user').then((res) => {
      this.user = res.data[0]
      // console.log(this.user)
    })
  },
  data() {
    return {
      user: []
    }
  },
  watch: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

#dao{
  width: 100%;
  background-color: rgb(245, 245, 245);
}

a{
  text-decoration: none;
  height: 30px;
}

#nav{
  margin: 0 auto;
  width: 1100px;
  height: 30px;
  font-size: 13px;
  font-family: "楷体";
}

a:hover{
  color: red;
  text-decoration: underline;
}

#nav1 {
  line-height: 30px;
  height: 20px;
  float: left;
}

#nav1>*{
  margin-left: 15px;
}

#nav2{
  line-height: 30px;
  float: right;
}

#nav2>* {
  margin-left: 15px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
