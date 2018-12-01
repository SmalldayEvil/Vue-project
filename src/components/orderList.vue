<template>
  <div class="right-auto">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr
              v-for="(item) in orderlist"
              :key="item.id"
            >
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong> <br />
                {{item.paymentTitle}}
              </td>
              <td align="left">{{item.add_time | showTimePlus}}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left">
                <router-link :to="'/VIP/orderDetail/'+item.id">
                  查看订单
                </router-link>
                <br>
                <router-link
                  :to="'/payMoney/'+item.id"
                  v-show="item.status == 1"
                >
                  去付款<br>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
            @current-change="indexChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalcount"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data() {
    return {
      orderlist: [],
      pageIndex: 1,
      pageSize: 10,
      totalcount: undefined
    };
  },
  methods:{
    indexChange(index){
      this.pageIndex = index;
      this.getData();
    },
    getData(){
      this.$axios
      .get(
        `site/validate/order/userorderlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`
      )
      .then(data => {
        this.orderlist = data.data.message;
        this.totalcount = data.data.totalcount;
        // console.log(data);
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
th,
td {
  text-align: center;
}
.page-foot {
  text-align: center;
}
</style>
