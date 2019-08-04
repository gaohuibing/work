<template>
  <div style="padding-bottom:60px;width:100%">
    <el-carousel class="banner" arrow="never">
      <el-carousel-item v-for="(item,index) in currentPreviewData.pic_paths" :key="index">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="pre-item">
      <span class="tit">{{currentPreviewData.goods_name}}</span>
    </div>
    <div class="pre-item">
      <p>
        市场价
        <span style="text-decoration: line-through">￥{{currentPreviewData.market_price}}</span>
      </p>
      <p
        style="color:red;font-size:24px;margin-top:10px;line-height1"
      >￥{{currentPreviewData.sell_price}}</p>
    </div>
    <div class="pre-item">
      <div>
        起订量
        <span class="gray">{{currentPreviewData.min_order}}个</span>
      </div>
    </div>
    <!-- <div class="pre-item" style="display:flex; justify-content: space-between;align-items:center">
      <div>
        供应商
        <span class="gray">清枫语</span>
      </div>
      <i class="el-icon-phone" style="color:#44b549;font-size:20px"></i>
    </div> -->
    <div class="goods-details">
      <div class="detail-tit">商品详情</div>
      <div class="detail-content">
        <div v-html="currentPreviewData.goods_detail"></div>
      </div>
    </div>
    <div class="tel-bots">
      <div class="b-icon">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="b-icon">
        <i class="el-icon-shopping-cart-1"></i>
      </div>
      <div class="b-btn">加入购物车</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadData();
  },
  data() {
    return {
      currentPreviewData: {
        pics: ["../../assets/images/ewm.png"],
        enterprise: "清枫语",
        goods_detail: "<p>aws</p>",
        s_stock: 12,
        s_sell_price: 54,
        s_market_price: 32,
        goods_name: "asnflkan"
      },
      userInfo: store.get("userInfo")
    };
  },
  methods: {
    loadData() {
      let id = this.$common.getUrlKey("id");
      this.$api
        .get("merchant/goods_mobile_preview", {         
          id: id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.currentPreviewData = res.data.data;
          } else {
            this.$message.error({ message: res.data.msg });
          }     
        })
        .catch(err => {
          this.$message.error({ message: err });       
        });
    }
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
}
.banner img {
  width: 100%;
}
.pre-item {
  padding: 12px;
  margin-bottom: 4px;
  color: #999;
  background: #fff;
}
.pre-item .tit {
  font-size: 26px;
  font-weight: 600;
  color: #333;
}
.pre-item .gray {
  color: #1c1c1c;
  margin-left: 10px;
}
.tel-bots {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 54px;
  display: flex;
  background: #fff;
}
.tel-bots .b-icon {
  width: 54px;
  text-align: center;
  line-height: 54px;
  font-size: 26px;
}
.tel-bots .b-btn {
  background: #44b549;
  color: #fff;
  font-size: 18px;
  flex-grow: 1;
  text-align: center;
  line-height: 54px;
}
.goods-details {
  background: #fff;
}
.detail-tit {
  padding: 12px;
  color: #999;
}
.detail-content {
  padding: 0 12px 12px;
}
.detail-content img {
  width: 100%;
}
</style>
<style>
.detail-content * {
	max-width: 100%;
}
.detail-content img {
  width: 100%;
}
</style>
