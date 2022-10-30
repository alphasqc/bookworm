<template>
  <div class="order">
    <div style="width: 70%; min-height: 700px; margin: 0 auto; padding-top: 30px;">
      <div id="ordermain" style="" v-for="(item,index) in order" :key="index">
        <div class="orderid" v-if="item.id != ''">订单号：{{item.id}}</div>
        <div class="noorder" v-else>还没有订单，请先去购物</div>
        <div id="ordergoods">
          <div class="gimg"><img :src="item.src" alt="" style="width: 70px; height:70px;"></div>
          <div class="gtitle">
            <span>{{item.name}}</span>
            <span>规格：{{item.size}}</span>
            <span>数量：{{item.num}}</span>
            <span>单价：{{item.price}}</span>
          </div>
          <div class="gprice">￥{{item.price*item.num}}.00</div>
          <div class="gdelete"><button @click="deleteOrder(item.id)">删除订单</button></div>
          <div class="gcon">
            <a>交易成功</a>
            <a>订单详情</a>
            <a>查看物流</a>
            <a>我已评价</a>
          </div>
          <div class="gchoose" v-if="item.type == '运输中'">
            <button @click="finishGood(index)">确认收货</button>
          </div>
          <div v-else><a href="#">追加评论</a></div>
        </div>
      </div>
      <div v-if="order == ''" class="nullmain">
        <h2>亲，没有订单，去<a href="" @click="Jump">首页</a>逛逛吧</h2>
      </div>
    </div>
  </div>
</template>

<style>
.orderid{
  background-color: aqua;
  height: 40px;
  font-family: '宋体';
  line-height: 40px;
}
#ordermain{
  border: aqua 1px solid;
}
#ordergoods{
  display: flex;
  justify-content: space-around;
  font-family: '宋体';
  font-size: 10px;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.gcon,.gtitle{
  display: flex;
  flex-direction: column;
}

.gcon>*{
  height: 20px;
}
</style>

<script>
import axios from 'axios'
import { getData } from '@/api/index.js'

export default {
  data () {
    return {
      order: [],
      type: 1
    }
  },
  methods: {
    finishGood(index) {
      this.order[index] = true
      location.reload()
    },
    typeCli (type) {
      if (type === 1) {
        this.order = this.$store.state.order
      }
      if (type === 2) {
        if (this.$store.state.order.type === 'unfinish') {
          this.order = this.$store.state.order
        }
      } else {
        if (this.$store.state.order.type === 'finish') {
          this.order = this.$store.state.orders
        }
      }
    },
    Jump () {
      this.$router.push('/home')
    },
    deleteOrder(id) {
      axios.request({
        method: 'delete',
        url: 'http://localhost:3000/order/' + id
      })
      location.reload()
    }
  },
  mounted () {
    // this.order = this.$storre.state.order
    getData('order').then((res) => {
      this.order = res.data
      // console.log(this.order)
    })
  }
}
</script>

<style>
.noorder{
  line-height: 300px;
  font-family: '华文琥珀';
  color: rgb(255, 113, 113);
  font-size: 30px;
}
#ordermain{
  width:95%;
  margin: 0 auto;
  margin-top: 20px;
}
.order>div{
  background-color: white;
}
</style>
