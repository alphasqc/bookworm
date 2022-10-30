<template>
  <div class="cart">
    <header style="height: 70px;">
      <div class="content">
        <h2 style="line-height: 70px; color: rgb(255,121,121);">购物车</h2>
      </div>
    </header>
    <main style="height: 550px">
      <div class="content">
        <div id="toper">
          <ul id="listtop">
            <li style="width: 100px;">
              <input type="checkbox" v-model="allchecked" @click="allCheck" :class=" allchecked.checked ? 'ckb_s':''">
              <label>全选</label>
            </li>
            <li style="width: 260px;">商品信息</li>
            <li style="width: 70px;">单价</li>
            <li style="width: 100px;">数量</li>
            <li style="width: 70px;">金额</li>
            <li style="width: 70px;">操作</li>
          </ul>
        </div>
        <div id="products" v-for="(item,index) in goodscar" :key="index">
          <div style="width: 30px;">
            <input type="checkbox" v-model="item.checked" @click="goodCheck" :class=" allchecked.checked ? 'ckb_s':''">
          </div>
          <div class="gname" style="width: 320px;">
            <img :src="item.src" style="width: 80px; height:80px;">
            <div style="width: 130px">{{item.name}}
              <div>规格:{{item.size}}</div>
            </div>
          </div>
          <div class="gprice" style="width: 70px;">￥{{item.price}}</div>
          <div class="gnum" style="width: 100px;">
            <button @click="edd(index)" style="height: 24px; width: 20px;">-</button>
            <input type="number" v-model="item.num" style="width:50px; height:20px;">
            <button @click="add(index)" style="height: 24px; width: 20px;">+</button>
          </div>
          <div class="gprices" style="width: 70px;">￥{{item.price*item.num}}.00</div>
          <div class="gdoit" style="width: 70px;">
            <button @click="deleteGood(item.id)">删除</button>
          </div>
        </div>
        <div v-if="goodscar == ''" class="nullmain">
          <h2>购物车暂时空空如也，去<a href="" @click="Jump">首页</a>逛逛吧</h2>
        </div>
      </div>
    </main>
    <footer style="height: 80px;">
      <div class="content">
        <a href="javascript:void(0);">删除</a>
        <div id="computer">
          <div>已选择商品 <span>{{CheckNum}}</span> 件</div>
          <div class="amount">合计(不含运费): <span class="sum">￥{{SumPrice}}.00</span></div>
          <button @click="carSubmit">结算</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.nullmain{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  line-height: 300px;
}
.nullmain a{
  font-size: 20px;
  color: red;
}
#products{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}

.gprice,.gnum,.gprices,.gdoit{
  display: flex;
  justify-content: center;
}

.gname {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}

#products *{
  font-size: 10px;
}

#computer>*{
  margin-right: 20px;
  line-height: 40px;
}

#computer>div>span{
  color: red;
  font-size: 25px;
}

#computer{
  /* width: 500px; */
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

#computer>button{
  background-color: red;
  color: white;
  margin-left: 30px;
  border-radius: 7px;
  border: 0;
  font-size: 20px;
  width: 100px;
  height: 40px;
}

footer>.content{
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#listtop{
  display: flex;
  justify-content: space-between;
}

#listtop>*{
  text-align: center;
}

#listtop *{
  font-family: '宋体';
  font-size: 14px;
}
</style>

<script>
import { getData } from '@/api/index.js'
import axios from 'axios'
export default {
  computed: {
    CheckNum() {
      let num = 0
      this.goodscar.forEach(item => {
        if (item.checked) {
          num = num + 1
        }
      })
      return num
    },
    SumPrice() {
      let sprice = 0
      this.goodscar.forEach(item => {
        if (item.checked) {
          sprice += item.price * item.num
        }
      })
      return sprice
    }
  },
  data () {
    return {
      allchecked: false,
      goodscar: [],
      order: {}
    }
  },
  methods: {
    Jump() {
      this.$router.push('/home')
    },
    allCheck() {
      this.allchecked = !this.allchecked
      if (this.allchecked) {
        this.goodscar.forEach(item => {
          item.checked = true
        })
      } else {
        this.goodscar.forEach(item => {
          item.checked = false
        })
      }
    },
    goodCheck() {
      this.checked = !this.checked
    },
    deleteGood(id) {
      axios.request({
        method: 'delete',
        url: 'http://localhost:3000/car/' + id
      })
      location.reload()
    },
    carSubmit () {
      this.goodscar.forEach(item => {
        if (item.checked) {
          axios.request({
            method: 'post',
            url: 'http://localhost:3000/order/',
            headers: {
              'Content-type': 'application/json'
            },
            data: {
              name: item.name,
              src: item.src,
              num: item.num,
              size: item.size,
              price: item.price
            }
          }).then((res) => {
            axios.request({
              method: 'delete',
              url: 'http://localhost:3000/car/' + item.id
            })
            this.$router.push('/order')
          })
        }
      })
    },
    add (index) {
      this.goodscar[index].num++
    },
    edd (index) {
      this.goodscar[index].num--
    }
  },
  mounted() {
    this.id = this.$store.state.goodid
    getData('car').then((res) => {
      this.goodscar = res.data
      // console.log(this.goodscar)
    })
  }
}
</script>

<style>
.content{
  width: 70%;
}

div::-webkit-scrollbar {
  width: 0;
}

main>.content{
  position: relative;
  background-color: white;
  border-radius: 10px;
  overflow: auto;
  box-sizing:border-box;
  padding: 10px;
}

footer>.content{
  background-color: white;
  box-shadow: 0px -1px 5px gray;
  border-radius: 5px;
}

footer{
  width: 100%;
  position: fixed;
  bottom: 0;
}
header,main,footer{
  display: flex;
  justify-content: center;
}
</style>
