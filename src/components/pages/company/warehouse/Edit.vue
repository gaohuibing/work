<template>
  <div class="good-edit">
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/company/warehouse' }">商品仓库</el-breadcrumb-item>
        <el-breadcrumb-item>新增商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-content" v-loading="loading">
      <el-form :model="formData" :rules="rules" ref="ruleForm">
        <div class="form-item">
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>基本信息
          </div>
          <!---->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              销售方式
            </div>
            <div>
              <el-form-item prop="sales_mode">
                <el-radio-group v-model="formData.sales_mode">
                  <el-radio label="1">自营</el-radio>
                  <el-radio label="2">批发</el-radio>
                  <el-radio label="3">分销</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品类型
            </div>
            <div>
              <el-form-item prop="goods_type">
                <el-radio-group v-model="formData.goods_type">
                  <el-radio label="1">实体商品</el-radio>
                  <el-radio label="2">虚拟商品</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品分类
            </div>
            <div class="inp-box">
              <el-form-item prop="first_sort">
                <el-cascader
                  placeholder="一级分类 / 二级分类"
                  :options="goodsType"
                  :props="defaultProps"
                  v-model="goodsTypeSelect"
                  @change="handleGoodsTypeChange"
                ></el-cascader>
              </el-form-item>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品品牌
            </div>
            <div class="inp-box">
              <el-form-item prop="goods_brand">
                <el-input placeholder="请输入商品品牌，无品牌可不填写" v-model="formData.goods_brand"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">（特殊商品无品牌的填写公司名称，无品牌商品将无法发布到市场）</div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              商品名称
            </div>
            <div class="inp-box">
              <el-form-item prop="goods_name">
                <el-input placeholder="请输入商品名称" v-model="formData.goods_name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span></span>
              分享描述
            </div>
            <div class="inp-box">
              <el-form-item>
                <el-input placeholder="请输入分享商品的描述" v-model="formData.share_describe"></el-input>
              </el-form-item>
            </div>
          </div>
          <!---->
        </div>
        <!---->
        <div class="form-item">
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>自营销售政策设置
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              发货时间
            </div>

            <div class="dingzhi">
              <el-input
                placeholder="15"
                style="width:64px;margin-right:8px"
                v-model="formData.s_deliver"
              ></el-input>个小时发货
            </div>
          </div>

          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              库存量
            </div>
            <div class="inp-box">
              <el-form-item prop="stock">
                <el-input placeholder="请输入库存数量" v-model="formData.s_stock"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">库存为0自动下架</div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              起订量
            </div>
            <div class="inp-box">
              <el-form-item prop="min_order">
                <el-input placeholder="请输入起订量" v-model="formData.s_min_order"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">不符合起订量要求不能提交订单</div>
          </div>

          <!--1-->
          <div class>
            <div class="form-item-name">
              <span style="color: #ED5580; margin-right: 3px;">*</span>自营销售价格设置
              <i>(成本价、市场价、会员价，可不填写)</i>
            </div>
          </div>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:15px;float:right"
            @click="addDeliver"
          >添加地区</el-button>
          <el-table :data="selfPostageData" style="width: 100%;margin-bottom:20px" border>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>选择地区
              </template>
              <template slot-scope="scope">
                {{scope.row.regionLabel}}
                <a
                  @click.prevent="editRegion(scope.row,'1')"
                  style="color:#44B549"
                >编辑</a>
              </template>
            </el-table-column>

            <el-table-column align="center" label="成本价">
              <template slot-scope="scope" v-if="scope.row.s_cost_price">￥{{scope.row.s_cost_price}}</template>
            </el-table-column>
            <el-table-column align="center" label="市场价">
              <template
                slot-scope="scope"
                v-if="scope.row.s_market_price"
              >￥{{scope.row.s_market_price}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>销售价
              </template>
              <template slot-scope="scope" v-if="scope.row.s_sell_price">￥{{scope.row.s_sell_price}}</template>
            </el-table-column>
            <el-table-column align="center" label="会员价">
              <template slot-scope="scope" v-if="scope.row.s_mem_price">￥{{scope.row.s_mem_price}}</template>
            </el-table-column>
            <el-table-column align="center" width="250">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>运费设置
              </template>
              <template slot-scope="scope">
                {{scope.row.postage=='0'
                ?'包邮':scope.row.postage=='1'
                ?'另计（批发模式默认）'
                :'买家承担 首件：'+scope.row.first_piece+' 续件：'+scope.row.more_piece}}
                <a
                  @click.prevent="editDeliver(scope.row,'1')"
                  style="color:#44B549;margin-left:15px"
                >修改运费</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-tools">
            <span class="tit">批量设置</span>
            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible1"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.s_cost_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible1=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible1=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">成本价</el-button>
            </el-popover>
            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible2"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.s_market_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible2=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible2=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">市场价</el-button>
            </el-popover>

            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible3"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.s_sell_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible3=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible3=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">销售价</el-button>
            </el-popover>
            <el-popover placement="bottom-start" width="200" trigger="click" v-model="visible4">
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.s_mem_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible4=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible4=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">会员价</el-button>
            </el-popover>
          </div>
        </div>

        <!--市场销售政策设置-->
        <div class="form-item">
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>市场销售政策设置(供应商专属设置)
            <a href style="float:right;color:#44B549;margin-right:20px">升级为供应商</a>
          </div>
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              供货方式
            </div>

            <div class="dingzhi">
              <el-radio-group v-model="formData.m_supplier_mode">
                <el-radio label="1">批发模式</el-radio>
                <el-radio label="2" disabled>分销模式</el-radio>
              </el-radio-group>
              <span style="color:#44B549;margin-left:20px;cursor:pointer">申请为分销供应商</span>
            </div>
          </div>

          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              发货时间
            </div>

            <div class="dingzhi">
              <el-form-item prop="m_deliver">
                <el-input
                  placeholder="15"
                  style="width:64px;margin-right:8px"
                  v-model="formData.m_deliver"
                ></el-input>个小时发货
              </el-form-item>
            </div>
          </div>

          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              库存量
            </div>
            <div class="inp-box">
              <el-form-item prop="m_stock">
                <el-input placeholder="请输入库存数量" v-model="formData.m_stock"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">库存为0自动下架</div>
          </div>
          <!--1-->
          <div class="form-group">
            <div class="f-label">
              <span>*</span>
              起订量
            </div>
            <div class="inp-box">
              <el-form-item prop="m_min_order">
                <el-input placeholder="请输入起订量" v-model="formData.m_min_order"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">不符合起订量要求不能提交订单</div>
          </div>

          <!--1-->
          <div class>
            <div class="form-item-name">
              <span style="color: #ED5580; margin-right: 3px;">*</span>市场销售价格设置
              <i>(成本价，可不填写；批发商品批发价必填；分销商品批发价和分销价必填)</i>
            </div>
          </div>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:15px;float:right"
            @click="addDeliverMarket"
          >添加地区</el-button>
          <el-table :data="marketPostage" style="width: 100%;margin-bottom:20px" border>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>选择地区
              </template>
              <template slot-scope="scope">
                {{scope.row.regionLabel}}
                <a
                  @click.prevent="editRegion(scope.row,'2')"
                  style="color:#44B549"
                >编辑</a>
              </template>
            </el-table-column>

            <el-table-column align="center" label="成本价">
              <template slot-scope="scope" v-if="scope.row.m_cost_price">￥{{scope.row.m_cost_price}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>市场价
              </template>
              <template
                slot-scope="scope"
                v-if="scope.row.m_market_price"
              >￥{{scope.row.m_market_price}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>批发价
              </template>
              <template
                slot-scope="scope"
                v-if="scope.row.m_wholesale_price"
              >￥{{scope.row.m_wholesale_price}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>分销价
              </template>
              <template slot-scope="scope" v-if="scope.row.m_dist_price">￥{{scope.row.m_dist_price}}</template>
            </el-table-column>
            <el-table-column align="center" width="250">
              <template slot="header">
                <span style="color: #ED5580; margin-right: 3px;">*</span>运费设置
              </template>
              <template slot-scope="scope">
                {{scope.row.postage=='0'
                ?'包邮':scope.row.postage=='1'
                ?'另计（批发模式默认）'
                :'买家承担 首件：'+scope.row.first_piece+' 续件：'+scope.row.more_piece}}
                <a
                  @click.prevent="editDeliver(scope.row,2)"
                  style="color:#44B549;margin-left:15px"
                >修改运费</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-tools">
            <span class="tit">批量设置</span>
            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible5"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.m_cost_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible5=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible5=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">成本价</el-button>
            </el-popover>
            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible6"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.m_market_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible6=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible6=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">市场价</el-button>
            </el-popover>

            <el-popover
              placement="bottom-start"
              width="200"
              trigger="click"
              v-model="visible7"
              style="margin-right:10px"
            >
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.m_wholesale_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible7=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible7=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">批发价</el-button>
            </el-popover>
            <el-popover placement="bottom-start" width="200" trigger="click" v-model="visible8">
              <div style="display:flex;align-items:center">
                <el-input v-model="formData.m_dist_price" style="width:100px"></el-input>
                <a
                  @click.prevent="visible8=false"
                  style="color:#44B549;font-size:12px;margin-left:10px"
                >确定</a>
                <a
                  @click.prevent="visible8=false"
                  style="color:#999;font-size:12px;margin-left:10px"
                >取消</a>
              </div>

              <el-button slot="reference" size="small">分销价</el-button>
            </el-popover>
          </div>
        </div>

        <!---->
        <div class="form-item">
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>商品图片
          </div>
          <!---->
          <div class="upload-box">
            <ul class="clearfix">
              <li v-for="(item,index) in goodsImgsSelect" :key="index">
                <img :src="item.pic_path" alt />
                <span class="el-icon-error" @click="delImgSelect(index)"></span>
              </li>
              <li @click="imgsDialogHandle">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </li>
            </ul>
          </div>
          <!---->
        </div>
        <!----->
        <div class="form-item">
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>商品详情
          </div>
          <div class="detial-edit">
            <quill-editor
              v-model="formData.goods_detail"
              ref="myQuillEditor"
              :options="editorOption"
            ></quill-editor>
          </div>
          <!---->
        </div>
      </el-form>
    </div>
    <div class="bot-tools-t" style="position:static">
      <el-button type="primary" @click="submitHandle('ruleForm')">确定</el-button>
      <el-button>取消</el-button>
      <el-button type="primary" plain>预览</el-button>
    </div>
    <!-- // 图片素材 -->
    <source-dialog :visible.sync="visible" :goodsImgsSelect.sync="goodsImgsSelect"></source-dialog>
    <!-- 地区选择 -->
    <region-dialog :regionVisible.sync="regionVisible" :regionValue.sync="regionValue"></region-dialog>
    <!-- 运费选择 -->
    <deliver-dialog :deliverVisible.sync="deliverVisible" :deliverForm.sync="deliverForm"></deliver-dialog>
  </div>
</template>
<script>
import SourceDialog from "./sourceDialog";
import { provinceAndCityDataPlus } from "element-china-area-data";
import { provinceAndCityData } from "element-china-area-data"; // 不带全部选项
import { quillRedefine } from "vue-quill-editor-upload";

import regionDialog from "./RegionDialog";
import deliverDialog from "./DeliverDialog";
export default {
  components: { SourceDialog, quillRedefine, regionDialog, deliverDialog },
  data() {
    return {
      apiUrl: this.$api.apiUrl + "merchant/upload_goods_detail",
      defaulProps: { multiple: true },
      rules: {
        goods_brand: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        first_sort: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
       
        s_stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        s_min_order: [
          { required: true, message: "请输入起订量", trigger: "blur" }
        ],
        s_deliver: [
          { required: true, message: "请输入发货时间", trigger: "blur" }
	  ],
	  m_stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        m_min_order: [
          { required: true, message: "请输入起订量", trigger: "blur" }
        ],
        m_deliver: [
          { required: true, message: "请输入发货时间", trigger: "blur" }
        ],
      },
      formData: {
        api_token: this.$api.getToken(),
        sales_mode: "1",
        goods_type: "1",
        first_sort: "",
        second_sort: "",
        goods_brand: "",
        goods_name: "",
        share_describe: "",

        s_deliver: "",
        s_stock: "",
        s_min_order: "",
        s_sell_price: "", // 销售价
        s_market_price: "", //市场价
        s_mem_price: "", // 会员价
        s_cost_price: "", //成本价

        pic_paths: "",
        goods_detail: "",

        m_supplier_mode: "1",
        m_deliver: "",
        m_stock: "",
        m_min_order: "",
        m_cost_price: "",
        m_market_price: "",
        m_wholesale_price: "",
        m_dist_price: "",
        market_postage: ""
      },
      // 商品分类
      goodsType: [],
      goodsTypeSelect: [],
      defaultProps: {
        label: "sort_name",
        children: "second_sort",
        value: "id"
      },
      // 地区
      regionData: provinceAndCityData,
      // 选择的地区
      regionValue: "",
      regionLabel: "",
      selfAddId: "",

      // 运费弹窗
      deliverVisible: false,
      deliverForm: {},
      // 富文本初始化
      editorOption: {
        // some quill options
      },

      goodsImgsSelect: [],
      // 自营运费列表
      selfPostageData: [],
      // 市场运费列表
      marketPostage: [],
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,

      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      regionVisible: false,
      loading: false,
      priceType: "" //1 自营 2 分销
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: this.apiUrl, // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: respnse => {
          return respnse.data;
        },
        methods: "POST", // 可选参数 图片上传方式  默认为post
        name: "image", // 可选参数 文件的参数名 默认为img
        size: 2000, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
        accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
        header: (xhr, formData) => {
          formData.append("api_token", this.$api.getToken());
        }
      }
    });
  },
  mounted() {
    this.getGoodsType();
  },
  methods: {
    // 分类选择
    handleGoodsTypeChange(value) {
      this.formData.first_sort = value[0];
      this.formData.second_sort = value[1] - value[0];
    },

    // 素材弹窗
    imgsDialogHandle() {
      this.visible = true;
    },
    // 删除图片
    delImgSelect(index) {
      this.goodsImgsSelect.splice(index, 1);
    },
    // 商品分类
    getGoodsType() {
      this.$api
        .get("sort/get_sort")
        .then(res => {
          if (res.data.code == 200) {
            this.goodsType = res.data.data;
            // 避免父级id与子级id一样 无法渲染
            this.goodsType.map((item, index) => {
              item.second_sort.map((value, key) => {
                value.id = value.id + value.father_id;
              });
            });
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 添加自营地区
    addDeliver() {
      this.selfPostageData.push({
        region: "",
        postage: "0",
        first_piece: "",
        more_piece: "",
        s_cost_price: this.formData.s_cost_price,
        s_sell_price: this.formData.s_sell_price,
        s_market_price: this.formData.s_market_price,
        s_mem_price: this.formData.s_mem_price,
        addId: this.$common.getuuid()
      });
    },
    // 添加分销地区
    addDeliverMarket() {
      this.marketPostage.push({
        region: "",
        postage: "0",
        first_piece: "",
        more_piece: "",
        m_cost_price: this.formData.m_cost_price,
        m_market_price: this.formData.m_market_price,
        m_wholesale_price: this.formData.m_wholesale_price,
        m_dist_price: this.formData.m_dist_price,
        addId: this.$common.getuuid()
      });
    },
    // 修改自营地区
    editRegion(row, priceType) {
      this.priceType = priceType;
      this.selfAddId = row.unique_id ? row.unique_id : row.addId;
      this.regionValue = row.region;
      this.regionVisible = true;
    },

    // 修改自营运费
    editDeliver(row, priceType) {
      this.priceType = priceType;
      this.selfAddId = row.unique_id ? row.unique_id : row.addId;
      this.deliverForm = {
        postage: row.postage,
        first_piece: row.first_piece,
        more_piece: row.more_piece
      };
      this.deliverVisible = true;
    },
    // 保存
    submitHandle(formName) {
	    this.loading = true;
      this.formData.self_postage = this.selfPostageData;
      this.formData.market_postage = this.marketPostage;         
      this.$refs[formName].validate(valid => {
        if (valid) {
      //     this.formData.s_cost_price = (this.formData.s_cost_price - 0).toFixed(2);
      //     this.formData.s_sell_price = (this.formData.s_sell_price - 0).toFixed(2);
      //     this.formData.s_market_price = (this.formData.s_market_price - 0).toFixed(2);
          this.formData.pic_paths = this.goodsImgsSelect.map(
            (item, index) => item.pic_path
          );
          this.$api
            .post("merchant/upload_goods", this.formData)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "上传商品成功",
                  type: "success"
                });
                setTimeout(h => {
                  this.loading = false;
                  this.$router.replace("/company/warehouse/warehouse");
                }, 1500);
              } else {
                this.$message.error({ message: res.data.msg });
              }
            })
            .catch(err => {
              this.$message.error({ message: err });
            });
        } else {
          this.$message.error("请将信息填写完整");
          return false;
        }
      });
    }
  },
  watch: {
    regionValue(value) {
      if (value) {
        let arr = value.split(",");
        let result = [];
        arr.map((bj, bjindex) => {
          this.regionData.find(item => {
            item.value == bj ? result.push(item.label) : "";
          });
          this.regionData.map((region, reginindex) => {
            if (region.children) {
              region.children.find(item => {
                item.value == bj ? result.push(item.label) : "";
              });
            }
          });
        });
        this.regionLabel = result.join(",");
        if (this.priceType == 1) {
          this.selfPostageData.find(item => {
            if (
              item.unique_id == this.selfAddId ||
              item.addId == this.selfAddId
            ) {
              this.$set(item, "regionLabel", this.regionLabel);
              this.$set(item, "region", value);
            }
          });
        } else {
          this.marketPostage.find(item => {
            if (
              item.unique_id == this.selfAddId ||
              item.addId == this.selfAddId
            ) {
              this.$set(item, "regionLabel", this.regionLabel);
              this.$set(item, "region", value);
            }
          });
        }
      }
    },
    deliverForm: {
      handler(value) {
        if (this.priceType == 1) {
          this.selfPostageData.find(item => {
            if (
              item.unique_id == this.selfAddId ||
              item.addId == this.selfAddId
            ) {
              this.$set(item, "postage", value.postage);
              this.$set(item, "first_piece", value.first_piece);
              this.$set(item, "more_piece", value.more_piece);
            }
          });
        } else {
          this.marketPostage.find(item => {
            if (
              item.unique_id == this.selfAddId ||
              item.addId == this.selfAddId
            ) {
              this.$set(item, "postage", value.postage);
              this.$set(item, "first_piece", value.first_piece);
              this.$set(item, "more_piece", value.more_piece);
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    // 成本价
    "formData.s_cost_price"(value) {
      this.selfPostageData.map(item => {
        item.s_cost_price = value;
      });
    },
    //     销售价
    "formData.s_sell_price"(value) {
      this.selfPostageData.map(item => {
        item.s_sell_price = value;
      });
    },
    //     市场价
    "formData.s_market_price"(value) {
      this.selfPostageData.map(item => {
        item.s_market_price = value;
      });
    },
    //    会员价
    "formData.s_mem_price"(value) {
      this.selfPostageData.map(item => {
        item.s_mem_price = value;
      });
    },

    // 市场成本价
    "formData.m_cost_price"(value) {
      console.log(value);
      this.marketPostage.map(item => {
        item.m_cost_price = value;
      });
    },
    //     市场价
    "formData.m_market_price"(value) {
      this.marketPostage.map(item => {
        item.m_market_price = value;
      });
    },
    //     批发价
    "formData.m_wholesale_price"(value) {
      this.marketPostage.map(item => {
        item.m_wholesale_price = value;
      });
    },
    //    分销价
    "formData.m_dist_price"(value) {
      this.marketPostage.map(item => {
        item.m_dist_price = value;
      });
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
  padding-bottom: 20px;
  padding-left: 184px;
}
.upload-box li {
  margin: 15px;
  cursor: pointer;
  position: relative;
  background: #f6f7ff;
  border: 1px solid #e7e7eb;
  border-radius: 3px;
  text-align: center;
  width: 150px;
  height: 150px;
  line-height: 150px;
  float: left;
}
.upload-box li img {
  width: 100%;
  height: 100%;
}
.upload-box li i {
  font-size: 60px;
}
.upload-box li span {
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}
.form-item-name {
  color: #262826;
  font-weight: 600;
  margin: 15px 0;
  padding-left: 15px;
}
.form-item-name i {
  font-size: 12px;
  color: #999;
  font-style: normal;
  margin-left: 4px;
}
.table-tools {
  display: flex;
  padding-bottom: 20px;
  align-items: center;
}
.table-tools .tit {
  margin-right: 10px;
  font-weight: 600;
}
</style>
