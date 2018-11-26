<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th class="info" align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item, index) in shopCarList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ccc">
                                        </el-switch>
                                    </td>
                                    <td class="info" align="left" colspan="2">
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td width="84" align="left">¥ {{item.sell_price}}</th>
                                    <td width="104" align="center">
                                        <el-input-number size="mini" v-model="item.buycount"></el-input-number>
                                        </th>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}} 元</th>
                                    <td width="54" align="center">
                                        <el-button @click="del1(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr v-show="shopCarList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/proList">马上去购物</router-link>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{numSum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{priceSum}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/proList">
                                <button class="button">继续购物</button>
                            </router-link>
                            <router-link to="/order">
                                <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shopCar",
  data: function() {
    return {
      shopCarList: []
    };
  },
  methods: {
    del1(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.shopCarList.forEach((v, i) => {
            if (v.id == id) {
              this.shopCarList.splice(i, 1);
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    priceSum: function() {
      let sum = 0;
      this.shopCarList.forEach(v => {
        if (v.selected) {
          sum += v.sell_price * v.buycount;
        }
      });
      return sum;
    },
    numSum: function() {
      let sum = 0;
      this.shopCarList.forEach(v => {
        if (v.selected) {
          sum += v.buycount;
        }
      });
      return sum;
    }
  },
  created: function() {
    // console.log(this.$store.state.shopCarData);
    let str = "";
    for (let key in this.$store.state.shopCarData) {
      str += key + ",";
    }
    str = str.slice(0, str.length - 1);
    // console.log(str);
    this.$axios.get(`site/comment/getshopcargoods/${str}`).then(data => {
      //   console.log(data);
      data.data.message.forEach(v => {
        v.buycount = this.$store.state.shopCarData[v.id];
        v.selected = true;
      });
      this.shopCarList = data.data.message;
      //   console.log(this.shopCarList);
    });
  },
  watch: {
    shopCarList: {
      handler: function(nv, ov) {
        let obj = {};
        nv.forEach(v => {
          obj[v.id] = v.buycount;
        });
        //   console.log(obj);
        this.$store.commit("updateData", obj);
      },
      deep: true
    }
  }
};
</script>
<style>
.info {
  display: flex;
  align-items: center;
}
.info img {
  width: 80px;
  height: 80px;
  margin-left: 30px;
  margin-right: 40px;
}
</style>
