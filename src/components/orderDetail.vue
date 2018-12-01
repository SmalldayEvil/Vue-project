<template>
  <div class="right-auto">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <router-link
          to="/VIP/orderList"
          class="add"
        >
          <i class="iconfont icon-reply"></i>返回
        </router-link>
        <ul>
          <li class="selected">
            <a href="javascript:;">查看订单</a>
          </li>
        </ul>
      </div>
      <div class="order-progress">
        <ul>
          <li class="first active">
            <div class="progress">下单</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li :class="{active:orderInfo.status>=2}">
            <div class="progress">已付款</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li :class="{active:orderInfo.status>=3}">
            <div class="progress">已经发货</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
          <li
            :class="{active:orderInfo.status>=4}"
            class="last"
          >
            <div class="progress">已完成</div>
            <div class="info">2017-10-25 21:38:15</div>
          </li>
        </ul>
      </div>
      <div class="form-box accept-box form-box1">
        <dl class="head form-group">
          <dd>
            订单号：{{orderInfo.order_no}}
            <router-link
              v-show="orderInfo.status == 1"
              class="btn-pay"
              :to="'/payMoney/'+orderid"
            >
              去付款
            </router-link>
            <a
              v-show="orderInfo.status == 2"
              class="btn-pay"
              @click="signOrder"
            >
              代签收
            </a>
            <!---->
          </dd>
        </dl>
        <dl class="form-group">
          <dt>订单状态：</dt>
          <dd>{{orderInfo.statusName}}</dd>
        </dl>
        <dl class="form-group">
          <dt>快递单号：</dt>
          <dd>{{orderInfo.express_no | showNum("nbspxbxbxb")}}</dd>
        </dl>
        <dl class="form-group">
          <dt>支付方式：</dt>
          <dd>{{orderInfo.paymentTitle}}</dd>
        </dl>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="5"
          class="ftable"
        >
          <tbody>
            <tr>
              <th align="left">商品信息</th>
              <th width="60%">名称</th>
              <th width="10%">单价</th>
              <th width="10%">数量</th>
              <th width="10%">金额</th>
            </tr>
            <tr
              v-for="(item) in proList"
              :key="item.goods_id"
            >
              <td width="60">
                <img
                  :src="item.imgurl"
                  class="img"
                />
              </td>
              <td align="left">
                <router-link :to="'/proDetail/'+item.goods_id">
                  {{item.goods_title}}
                </router-link>
              </td>
              <td align="center">
                <s>￥{{item.goods_price}}</s>
                <p>￥{{item.real_price}}</p>
              </td>
              <td align="center">{{item.quantity}}</td>
              <td align="center">￥{{item.quantity*item.real_price}}</td>
            </tr>
            <tr>
              <td
                colspan="7"
                align="right"
              >
                <p>
                  商品金额：
                  <b class="red">￥{{orderInfo.real_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                  <b class="red">￥{{orderInfo.express_fee}}</b>
                </p>
                <p style="font-size: 22px;">
                  应付总金额： <b class="red">￥{{orderInfo.order_amount}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-box accept-box">
        <dl class="head form-group">
          <dd>收货信息</dd>
        </dl>
        <dl class="form-group">
          <dt>顾客姓名：</dt>
          <dd>{{orderInfo.accept_name}}</dd>
        </dl>
        <dl class="form-group">
          <dt>送货地址：</dt>
          <dd>{{orderInfo.area}} &nbsp; {{orderInfo.address}}</dd>
        </dl>
        <dl class="form-group">
          <dt>联系电话：</dt>
          <dd>{{orderInfo.mobile}}</dd>
        </dl>
        <dl class="form-group">
          <dt>电子邮箱：</dt>
          <dd>{{orderInfo.email}}</dd>
        </dl>
        <dl class="form-group">
          <dt>备注留言：</dt>
          <dd>{{orderInfo.message}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  data() {
    return {
      orderid: undefined,
      proList: [],
      orderInfo: {}
    };
  },
  methods: {
    signOrder() {
      this.$axios
        .get(`site/validate/order/complate/${this.orderid}`)
        .then(data => {
          console.log(data);
          this.getData();
        });
    },
    getData() {
      this.$axios
        .get("site/validate/order/getorderdetial/" + this.orderid)
        .then(data => {
          console.log(data);
          this.proList = data.data.message.goodslist;
          this.orderInfo = data.data.message.orderinfo;
        });
    }
  },
  created() {
    this.orderid = this.$route.params.orderid;
    this.getData();
  }
};
</script>
<style>
.accept-box {
  height: 250px;
}
</style>
