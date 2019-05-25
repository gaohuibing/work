<template>
  <div class="good-edit">
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/company/warehouse' }">商品仓库</el-breadcrumb-item>
        <el-breadcrumb-item>新增商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-content">
      <form>
        <div class="form-item">
          <div class="item-name">基本信息</div>
          <!---->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品类型
            </div>
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品类型
            </div>
            <div class="inp-box">
              <el-cascader
                placeholder="一级分类 / 二级分类"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              ></el-cascader>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品类型
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入商品品牌，无品牌可不填写"></el-input>
            </div>
            <div class="inp-tips">（特殊商品无品牌的填写公司名称，无品牌商品将无法发布到市场）</div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品名称
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入商品名称"></el-input>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              分享描述
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入分享商品的描述"></el-input>
            </div>
          </div>
          <!---->
        </div>
        <!---->
        <div class="form-item">
          <div class="item-name">销售政策</div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              成本价
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入成本价"></el-input>
            </div>
            <div class="inp-tips">（仅自己可见）</div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              销售价
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入销售价"></el-input>
            </div>
            <div class="inp-tips">（对外价格）</div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              市场价
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入市场价"></el-input>
            </div>
            <div class="inp-tips">（划线价，仅供参考）</div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              库存
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入库存数量"></el-input>
            </div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              起订量
            </div>
            <div class="inp-box">
              <el-input placeholder="请输入起订量"></el-input>
            </div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              销售方式
            </div>
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="3">现货</el-radio>
                <el-radio :label="6">定制</el-radio>
              </el-radio-group>
            </div>
            <div class="dingzhi">
              <el-input placeholder="15" style="width:64px;margin:0 8px"></el-input>天发货
            </div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              一件代发
            </div>
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              销售区域
            </div>
            <div class="inp-box">
              <el-cascader
                placeholder="请选择"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              ></el-cascader>
            </div>
            <div class="inp-tips">（以所选销售区域对外开放，市场发布需要审核）</div>
          </div>
        </div>
        <!---->
        <div class="form-item">
          <div class="item-name">商品图片</div>
          <!---->
          <div class="upload-box">
            <ul>
              <li>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>主图</p>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>副图</p>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>副图</p>
              </li>
            </ul>
          </div>
          <!---->
        </div>
        <!----->
        <div class="form-item">
          <div class="item-name">商品详情</div>
          <div class="detial-edit">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </div>
          <!---->
        </div>
      </form>
    </div>
    <div class="bot-tools-t" style='position:static'>
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
	<el-button type="primary" plain>预览</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 3,
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            }
          ]
        }
      ],
      selectedOptions: [],
      imageUrl: "",
      content: "<h2>I am Example</h2>",
      editorOption: {
        // some quill options
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
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
.upload-box ul {
  display: flex;
  justify-content: center;
}
.upload-box li {
  margin: 0 15px;
}
.upload-box li p {
  line-height: 30px;
  text-align: center;
}
</style>
