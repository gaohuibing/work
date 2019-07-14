<template>
  <div class="preview">
    <div class="tit">商品详情</div>
    <div class="preview-item">
      <div class="item-name">基本信息</div>
      <div class="infobox">
        <div class="pic">
          <div class="big">
            <img :src="currentImg" alt />
          </div>
          <div class="small">
            <template v-for="(item,key) in previewData.pics">
              <div :key="key" @click="imgHandle(item)">
                <img :src="item.pic_path" alt />
              </div>
            </template>
          </div>
        </div>
        <div class="info">
          <div class="list">
            <span>商品名称</span>
            {{previewData.goods_name}}
            <el-button type="primary" size="small" style="margin-left:20px">加入活动</el-button>
            <el-button type="primary" size="small">加入咨询</el-button>
          </div>
          <div class="list">
            <span>批发价</span>
            {{previewData.m_wholesale_price||'--'}}
          </div>
          <div class="list">
            <span>零售价</span>
            {{previewData.s_sell_price||'--'}}
          </div>
          <div class="list">
            <span>供应商名称</span>{{userInfo.enterprise}}
            <el-button size="small" style="margin-left:20px">设为伙伴</el-button>
          </div>
          <div class="list">
            <span>联系方式</span>{{userInfo.mobile}}
          </div>
          <div class="list">
            <span>联系地址</span>{{$common.regionFormat(`${userInfo.province}-${userInfo.city}-${userInfo.county}`)}}
          </div>
        </div>
      </div>
    </div>

    <div class="preview-item">
      <div class="item-name">销售方式</div>
      <div class="mka">
        <span>销售方式 {{previewData.sales_mode==1?'自营模式':'供应商模式'}}</span>
        <span>起订量 {{previewData.s_min_order}}</span>
        <span>销售区域 {{previewData.regionLabels}}</span>
      </div>
    </div>
    <div class="preview-item">
      <div class="item-name">商品详情</div>
      <div class="details" v-html="previewData.goods_detail"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadQueryData();
  },
  data() {
    return {
      previewData: {},
      pics: [],
	currentImg: "",
	userInfo:store.get('userInfo')
    };
  },
  methods: {
    loadQueryData() {	   
      if (this.$route.query.preview) {
        this.previewData = JSON.parse(this.$route.query.preview);
        if (this.previewData.pics.length) {
          this.currentImg = this.previewData.pics[0].pic_path;
        }
		console.log(this.previewData)
        this.$nextTick(function() {
          
          document.body.scrollTop = 0;
          document.getElementById("wrap").scrollTop = 0;
        });
      }
    },
    imgHandle(pic) {
      this.currentImg = pic.pic_path;
    }
  }
};
</script>

<style scoped>
.item-name {
  height: 40px;
  line-height: 40px;
  background: rgba(246, 247, 255, 1);
  padding-left: 15px;
  margin-bottom: 15px;
}
.preview {
  padding: 24px;
}
.tit {
  margin-bottom: 24px;
  font-size: 18px;
}
.infobox {
  display: flex;
  padding: 24px 0;
  padding-left: 240px;
}
.pic {
  width: 380px;
}
.big {
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
}
.big img {
  width: 100%;
}
.small {
  display: flex;
  justify-content: space-between;
  width: 260px;
  margin-top: 10px;
  align-items:stretch;
}
.small > div {
  margin-right: 10px;
  cursor: pointer;
}
.small > div img {
  width: 100%;
}
.small > div:last-child {
  margin: 0;
}
.list {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.list span {
  width: 80px;
  text-align: right;
  margin-right: 20px;
}
.mka {
  margin-bottom: 24px;
  line-height: 1.6;
  padding-left: 240px;
}
.mka span {
  margin-right: 30px;
}
.details {
  padding: 24px;
}
</style>
