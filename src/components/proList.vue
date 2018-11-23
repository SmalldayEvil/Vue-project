<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(cate) in item.subcates" :key="cate.id">
                                                {{cate.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(cate) in item.subcates" :key="cate.id" href="/goods/43.html">{{cate.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{++index}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | showTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(messages) in message" :key="messages.level1cateid" class="section">
            <div class="main-tit">
                <h2>{{messages.catetitle}}</h2>
                <p>
                    <a v-for="(level2catelists) in messages.level2catelist" :key="level2catelists.subcateid" href="/goods/43.html">{{level2catelists.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(data) in messages.datas" :key="data.artID">
                            <router-link :to="'/proDetail/'+data.artID">
                                <div class="img-box">
                                    <img :src="data.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{data.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{data.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{data.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{data.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: "proList",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      message: []
    };
  },
  created: function() {
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(data => {
        this.catelist = data.data.message.catelist;
        this.sliderlist = data.data.message.sliderlist;
        this.toplist = data.data.message.toplist;
      });
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
      .then(data => {
        this.message = data.data.message;
      });
  },
};
</script>
<style>
.left-705 img {
  width: 100%;
  height: 100%;
}
</style>