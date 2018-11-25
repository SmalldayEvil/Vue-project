<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{proInfo.title}}</h1>
                                <p class="subtitle">{{proInfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{proInfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{proInfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{proInfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="proInfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{proInfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="add2shopCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="indexTab=0" :class="{selected:indexTab==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="indexTab=1" :class="{selected:indexTab==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-html="proInfo.content" v-show="indexTab==0">
                            </div>
                            <div class="tab-content" v-show="indexTab==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="comContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitCom" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | showTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :current="pageIndex" @on-change="toggleCom" :total="totalcount" show-elevator />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotPro" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/proDetail/'+item.id">
                                                <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                                <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/proDetail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | showTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
export default {
  name: "proDetail",
  data: function() {
    return {
      artId: "",
      proInfo: {},
      hotPro: [],
      imgList: [],
      buyCount: 1,
      indexTab: 0,
      pageIndex: 1,
      pageSize: 10,
      comments: [],
      totalcount: null,
      comContent: "",
      images: {
        // required
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 200,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    initData: function() {
      this.images.normal_size = [];
      this.buyCount = 1;
      this.artId = this.$route.params.artId;
      this.$axios
        .get(
          "http://111.230.232.110:8899/site/goods/getgoodsinfo/" + this.artId
        )
        .then(data => {
          this.proInfo = data.data.message.goodsinfo;
          this.hotPro = data.data.message.hotgoodslist;
          this.imgList = data.data.message.imglist;
          this.imgList.forEach(v => {
            this.images.normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
        });
      this.getComments();
    },
    getComments: function() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artId
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(data => {
          this.comments = data.data.message;
          this.totalcount = data.data.totalcount;
        });
    },
    toggleCom: function(page) {
      this.pageIndex = page;
      this.getComments();
    },
    submitCom: function() {
      if (this.comContent == "") {
        this.$Message.warning("评论内容不能为空哦 !!");
        return;
      }
      this.$axios
        .post(
          "http://111.230.232.110:8899/site/validate/comment/post/goods/" +
            this.artId,
          { commenttxt: this.comContent }
        )
        .then(data => {
          if (data.data.status == 0) {
            this.pageIndex = 1;
            this.getComments();
            this.comContent = "";
            this.$Message.success(data.data.message);
          } else {
            this.$Message.success(data.data.message);
          }
        });
    },
    add2shopCar: function() {
      this.$store.commit("add2shopCar", {
        proId: this.artId,
        proNum: this.buyCount
      });
      this.$Message.success('添加成功!');
    }
  },
  created: function() {
    this.initData();
  },
  watch: {
    $route: function() {
      this.pageIndex = 1;
      this.initData();
    }
  }
};
</script>
<style>
.tab-content.entry img {
  vertical-align: middle;
  max-width: 100%;
}
.pic-box {
  width: 320px;
  /* height: 320px; */
}
.preview-box img {
  width: 100%;
  height: 100%;
}
.thumb-list img {
  width: 60px;
  height: 60px;
}
.control {
  display: none !important;
}
</style>
