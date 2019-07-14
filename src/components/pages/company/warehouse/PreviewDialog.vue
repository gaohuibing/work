<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="previewbox">
        <!-- left -->
        <div class="iphone-bg">
          <div class="iphone-main">
            <!-- 以下为html 内容 -->
            <div class="main">
              <vue-scrollbar class="my-scrollbar full-height" ref="Scrollbar" id="scroll">
                <div style="padding-bottom:60px">
                  <el-carousel class="banner" arrow="never">
                    <el-carousel-item v-for="(item,index) in currentPreviewData.pics" :key="index">
                      <img :src="item.pic_path" alt />
                    </el-carousel-item>
                  </el-carousel>
                  <div class="pre-item">
                    <span class="tit">{{currentPreviewData.goods_name}}</span>
                  </div>
                  <div class="pre-item">
                    <p>
                      市场价
                      <span style="text-decoration: line-through">￥{{currentPreviewData.s_market_price}}</span>
                    </p>
                    <p style="color:red;font-size:24px;margin-top:10px;line-height1">{{currentPreviewData.s_sell_price}}</p>
                  </div>
                  <div class="pre-item">
                    <div>
                      起订量
                      <span class="gray">{{currentPreviewData.s_min_order}}个</span>
                    </div>
                  </div>
                  <div
                    class="pre-item"
                    style="display:flex; justify-content: space-between;align-items:center"
                  >
                    <div>
                      供应商
                      <span class="gray">{{userInfo.enterprise}}</span>
                    </div>
                    <i class="el-icon-phone" style="color:#44b549;font-size:20px"></i>
                  </div>
                  <div class="goods-details">
                    <div class="detail-tit">商品详情</div>
                    <div class="detail-content">
                      <div v-html="currentPreviewData.goods_detail"></div>
                    </div>
                  </div>
                </div>
              </vue-scrollbar>
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
          </div>
        </div>
        <!-- right -->
        <div class="rightmain">
          <div class="ewmtit">手机扫码预览</div>
          <div class="ewmbox">
            <img src="../../../../assets/images/ewm.png" alt />
            <p>使用微信扫一扫</p>
          </div>
          <div class="previewbtn" @click="pcPreview">网页预览</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";

export default {
  props: ["previewVisble", "previewData"],
  components: { VueScrollbar },
  mounted() {
   
  },
  data() {
    return {
      dialogVisible: false,
      currentPreviewData: "",
    
	currentImg:[],
	userInfo:store.get('userInfo')
    };
  },
  methods: {
    pcPreview() {
      this.$router.push({
        path: "/goods_preview",
        query: {
          preview: JSON.stringify(this.currentPreviewData)
        }
      });
    },
   
    imgHandle(pic) {
      this.currentImg = pic.pic_path;
    }
  },
  watch: {
    previewVisble(v) {
      this.dialogVisible = v;
    },
    dialogVisible(v) {
      this.$emit("update:previewVisble", v);
    },
    previewData(v) {
	this.currentPreviewData = JSON.parse(v);
	if (this.currentPreviewData.pics.length) {
          this.currentImg = this.currentPreviewData.pics[0].pic_path;
        }

        this.$nextTick(function() {          
          document.getElementById("scroll").scrollTop = 0;
	  });	  
    }
  }
};
</script>

<style scoped>
.previewbox {
  padding: 0 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iphone-bg {
  width: 375px;
  height: 770px;
  background: url(../../../../assets/images/iphone.png) no-repeat;
  position: relative;
}
.iphone-main {
  position: absolute;
  top: 94px;
  left: 19px;
  right: 23px;
  bottom: 89px;
  overflow-x: hidden;
}
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
.rightmain {
  width: 240px;
  text-align: center;
}
.ewmtit {
  font-size: 32px;
  margin-bottom: 37px;
}
.ewmbox {
  width: 200px;
  margin: 0 auto;
  overflow: hidden;
}
.ewmbox img {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
.ewmbox p {
  font-size: 24px;
  color: #44b549;
}
.previewbtn {
  margin-top: 100px;
  color: #44b549;
  font-size: 24px;
  cursor: pointer;
}
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
  position: absolute;
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
