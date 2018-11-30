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
                <li class="active">
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
          <div class="cart-box">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <h2 class="slide-tit">
                <span>1、收货地址</span>
              </h2>
              <div
                id="orderForm"
                name="orderForm"
                url=""
              >
                <div class="form-box address-info">
                  <el-form-item
                    label="收货人姓名"
                    prop="accept_name"
                  >
                    <el-input v-model="ruleForm.accept_name"></el-input>
                  </el-form-item>
                  <el-form-item label="收货地区">
                    <v-distpicker
                      @selected="onSelected"
                      :province="select.province.value"
                      :city="select.city.value"
                      :area="select.area.value"
                    ></v-distpicker>
                  </el-form-item>
                  <el-form-item
                    label="收货地址"
                    prop="address"
                  >
                    <el-input v-model="ruleForm.address"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="手机号"
                    prop="mobile"
                  >
                    <el-input v-model="ruleForm.mobile"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="电子邮箱"
                    prop="email"
                  >
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="邮政编码"
                    prop="post_code"
                  >
                    <el-input v-model="ruleForm.post_code"></el-input>
                  </el-form-item>
                </div>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <Radio @on-change="ruleForm.payment_id=6"></Radio>在线支付
                      <em>手续费：0.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <RadioGroup
                      v-model="ruleForm.express_id"
                      @on-change="changePrice"
                    >
                      <Radio :label="1">顺丰快递</Radio>
                      <em>费用：20.00元</em>&nbsp;&nbsp;
                      <Radio :label="3">韵达快递</Radio>
                      <em>费用：10.00元</em>&nbsp;&nbsp;
                      <Radio :label="2">圆通快递</Radio>
                      <em>费用：12.00元</em>
                    </RadioGroup>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th
                        colspan="2"
                        align="left"
                      >商品信息</th>
                      <th
                        width="84"
                        align="left"
                      >单价</th>
                      <th
                        width="84"
                        align="center"
                      >购买数量</th>
                      <th
                        width="104"
                        align="left"
                      >金额(元)</th>
                    </tr>
                    <tr
                      v-for="(item) in shopList"
                      :key="item.id"
                    >
                      <td width="68">
                        <router-link :to="'/proDetail/'+item.id">
                          <img
                            :src="item.img_url"
                            class="img"
                          >
                        </router-link>
                      </td>
                      <td>
                        <router-link :to="'/proDetail/'+item.id">
                          {{item.title}}
                        </router-link>

                      </td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price}}
                        </span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price*item.buycount}}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注</dt>
                      <dd>
                        <textarea
                          name="message"
                          class="input"
                          style="height:50px;resize:none"
                          v-model="ruleForm.message"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label
                        id="expressFee"
                        class="price"
                      >{{ruleForm.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label
                        id="totalAmount"
                        class="price"
                      >{{totalPrice+ruleForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <a
                        class="btn button"
                        href="/cart.html"
                      >返回购物车</a>
                      <a
                        id="btnSubmit"
                        class="btn submit"
                        @click="submitForm('ruleForm')"
                      >确认提交</a>
                    </p>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入省市联动组件
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  components: { VDistpicker },
  data: function() {
    let isMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码!"));
      }
    };
    let isPostCode = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(?!\d)$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮政编码!"));
      }
    };
    let isEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址!"));
      }
    };
    return {
      shopList: [],
      select: {
        province: {
          code: "",
          value: ""
        },
        city: {
          code: "",
          value: ""
        },
        area: {
          code: "",
          value: ""
        }
      },
      ruleForm: {
        accept_name: "张磊",
        address: "不是我家",
        mobile: "15179804596",
        email: "854123852@qq.com",
        post_code: "333400",
        express_id: 1,
        payment_id: 6,
        expressMoment: 20,
        message: "无"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人名称", trigger: "change" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "change" }
        ],
        address: [
          { required: true, message: "请填写收货地址", trigger: "change" }
        ],
        mobile: [
          {
            required: true,
            validator: isMobile,
            trigger: "change"
          }
        ],
        email: [
          {
            validator: isEmail,
            trigger: "change"
          }
        ],
        post_code: [
          {
            validator: isPostCode,
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    let ids = this.$route.params.ids;
    this.$axios.get("site/validate/order/getgoodslist/" + ids).then(data => {
      data.data.message.forEach(v => {
        v.buycount = this.$store.state.shopCarData[v.id];
      });
      this.shopList = data.data.message;
    });
  },
  computed: {
    totalNum() {
      let num = 0;
      this.shopList.forEach(v => {
        num += v.buycount;
      });
      return num;
    },
    totalPrice() {
      let num = 0;
      this.shopList.forEach(v => {
        num += v.buycount * v.sell_price;
      });
      return num;
    }
  },
  methods: {
    onSelected(data) {
      this.select = data;
    },
    changePrice(data) {
      // console.log(data);
      if (data == 1) {
        this.ruleForm.expressMoment = 20;
      } else if (data == 2) {
        this.ruleForm.expressMoment = 12;
      } else if (data == 3) {
        this.ruleForm.expressMoment = 10;
      }
    },
    submit() {
      this.ruleForm.goodsAmount = this.totalPrice;
      this.ruleForm.area = this.select;
      this.ruleForm.goodsids = this.$route.params.ids;
      let obj = {};
      this.shopList.forEach(v => {
        obj[v.id] = v.buycount;
      });
      this.ruleForm.cargoodsobj = obj;
      this.$axios
        .post("site/validate/order/setorder", this.ruleForm)
        .then(data => {
          if (data.data.status == 0) {
            this.shopList.forEach(v=>{
              this.$store.commit('delData',v.id);
            })
            this.$message.success("订单提交成功!");
            this.$router.push("/payMoney/" + data.data.message.orderid);
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          this.$message.error("请将信息填写完成再提交订单!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>
