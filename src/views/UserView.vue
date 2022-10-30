
<template>
    <div>
        <div class="title">
            <h2>个人中心</h2>
        </div>
        <div class="main" style="width: 70%; height: 600px; margin: 0 auto;">
            <div class="left" style="height: 600px; width: 85%;margin-top: 50px;">
                <div class="username">
                    <img src="../assets/userheader.png" alt="" style="margin-right: 20px;">
                    <span style="font-size: 30px;">{{username}}</span>
                </div>
                <div class="setbox">
                    <div class="userset">
                        <h3>修改账户密码</h3>
                        <input type="text" v-model="user.username">
                        <input type="text" v-model="user.password">
                        <button class="set" @click="setUser">修改账户</button>
                    </div>
                    <div class="useraddress">
                        <h3>修改地址</h3>
                        <div style="font-family: '华文楷体';">原地址:
                            <input v-if="address.name != ''" v-model="address.name"
                                style="border:0;font-family: '黑体';width: 300px;" readonly>
                            <span v-else>暂无地址，请添加</span>
                        </div>
                        <input type="text" style="width: 300px; height: 30px; " v-model="addname">
                        <button class="set" @click="setAddname">修改地址</button>
                        <div style="font-family: '华文楷体';">原收件人:
                            <input v-if="address.user != ''" v-model="address.user"
                                style="border:0;font-family: '黑体';width: 300px;" readonly>
                            <span v-else>暂无收件人，请添加</span>
                        </div>
                        <input type="text" style="width: 300px; height: 30px; " v-model="adduser">
                        <button class="set" @click="setAdduser">修改收件人</button>
                    </div>
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
      user: [],
      address: [],
      username: ''
    }
  },
  methods: {
    setUser() {
      axios.patch('http://localhost:3000/user/1', {
        username: this.user.username,
        password: this.user.password
      })
      location.reload()
    },
    setAdduser() {
      axios.patch('http://localhost:3000/address/1', {
        user: this.adduser
      })
      location.reload()
    },
    setAddname() {
      axios.patch('http://localhost:3000/address/1', {
        name: this.addname
      })
      location.reload()
    }
  },
  mounted () {
    // this.user = this.$store.state.userInfo
    getData('user').then((res) => {
      this.user = res.data[0]
      this.username = res.data[0].username
    })
    getData('address').then((res) => {
      this.address = res.data[0]
    })
  }
}

</script>
<style lang="scss" scoped>
.setbox{
  display: flex;
  justify-content: space-around;
  height: 400px;
}

.userset,.useraddress{
    height: 300px;
    display: flex;
    flex-direction: column;
}
.userset{
    justify-content: space-around;
}
.useraddress{
    justify-content: space-between;
}
.useraddress{
    justify-content: space-around;
}
.userset>input{
    width: 300px;
    height: 30px;
}
input{
    border-radius: 5px;
}
.set{
    width: 100px;
    height: 30px;
}
.username{
    display: flex;
    align-items: center;
}
.left{
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.main{
    display: flex;
    justify-content: space-around;
}
.title {
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: rgb(255, 69, 56);
}
h2 {
    line-height: 50px;
    margin-left: 220px;
    color: white;
}
.right {
    width: 500px;
}
</style>
