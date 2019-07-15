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
                  <el-radio label="1">自营模式</el-radio>
                  <el-tooltip class="item" effect="light" placement="right">
                    <div slot="content">
                      特别提示：所有商户达成条件均可开启供应商模式，达成条件即可成为批发供应商，可通过市场进行批发。
                      <br />成为小美市场分销供应商需要进行人工审核后，由运营方进行手动开启。
                    </div>
                    <el-radio label="2">供应商模式</el-radio>
                  </el-tooltip>
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
              <el-form-item prop="s_deliver">
                <el-input
                  placeholder="发货时间"
                  style="width:224px;margin-right:8px"
                  v-model="formData.s_deliver"
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
              <el-form-item prop="s_stock">
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
              <el-form-item prop="s_min_order">
                <el-input placeholder="请输入起订量" v-model="formData.s_min_order"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">不符合起订量要求不能提交订单</div>
          </div>

          <!--1-->
          <div class>
            <div class="form-item-name">
              <span style="color: #ED5580; margin-right: 3px;">*</span>自营销售价格设置
              <i>(自营商品在此处可不设置运费，根据所创建的活动在活动商品管理中进行设置)</i>
            </div>
          </div>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:15px;float:right"
            @click="addDeliver"
          >添加</el-button>
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
            <el-table-column align="center" width="100" label="操作">
              <template slot-scope="scope">
                <a
                  href="javascript:;"
                  @click.prevent="delSeLfHandle(scope.row)"
                  style="color:#999"
                >删除</a>
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
        <div class="form-item" style="position:relative">
          <div class="market-mask" v-if="is_supplier=='2'||formData.sales_mode=='1'">
            <el-button
              type="primary"
              size="mini"
              style="float:right; margin-top:10px;margin-right:20px"
            >申请成为供应商</el-button>
          </div>
          <div class="item-name">
            <span style="color: #ED5580; margin-right: 3px;">*</span>市场销售政策设置(供应商专属设置)
            <!-- <a href style="float:right;color:#44B549;margin-right:20px">升级为供应商</a> -->
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
              <el-form-item
                prop="m_deliver"
                :rules="[
      { required: is_supplier=='1'&&formData.sales_mode=='2', message: '请输入发货时间', trigger: 'blur' }     
    ]"
              >
                <el-input
                  placeholder="发货时间"
                  style="width:224px;margin-right:8px"
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
              <el-form-item
                prop="m_stock"
                :rules="[
      { required: is_supplier=='1'&&formData.sales_mode=='2', message: '请输入库存数量', trigger: 'blur' }     
    ]"
              >
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
              <el-form-item
                prop="m_min_order"
                :rules="[
      { required: is_supplier=='1'&&formData.sales_mode=='2', message: '请输入起订量', trigger: 'blur' }     
    ]"
              >
                <el-input placeholder="请输入起订量" v-model="formData.m_min_order"></el-input>
              </el-form-item>
            </div>
            <div class="inp-tips">不符合起订量要求不能提交订单</div>
          </div>

          <!--1-->
          <div class>
            <div class="form-item-name">
              <span style="color: #ED5580; margin-right: 3px;">*</span>市场销售价格设置
              <i>(批发价默认运费为线下结算，无须设置运费；分销价等于批发价+运费，如运费设置为包邮，那么批发价和分销价相同)</i>
            </div>
          </div>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:15px;float:right"
            @click="addDeliverMarket"
          >添加</el-button>
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
              <template slot-scope="scope" v-if="scope.row.dist_price">￥{{scope.row.dist_price}}</template>
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
            <el-table-column align="center" width="100" label="操作">
              <template slot-scope="scope">
                <a
                  href="javascript:;"
                  @click.prevent="delMarketHandle(scope.row)"
                  style="color:#999"
                >删除</a>
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
            <p
              style="color:#999;text-align:left;margin-bottom:20px;padding-left:194px"
            >备注：默认第一张为主图，最多5张</p>
            <p style="color:#44B549;text-align:center;margin-bottom:20px">1：1尺寸不大于750像素，主图必须上传</p>
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
      <el-button type="primary" plain @click="previewHandle">预览</el-button>
    </div>
    <!-- // 图片素材 -->
    <source-dialog
      :visible.sync="visible"
      :goodsImgsSelect.sync="goodsImgsSelect"
      :imgProps.sync="imgProps"
    ></source-dialog>
    <!-- 地区选择 -->
    <region-dialog :regionVisible.sync="regionVisible" :regionValue.sync="regionValue"></region-dialog>
    <!-- 运费选择 -->
    <deliver-dialog :deliverVisible.sync="deliverVisible" :deliverForm.sync="deliverForm"></deliver-dialog>
    <!-- 预览 -->
    <preview-dialog :previewVisble.sync="previewVisble" :previewData="previewData"></preview-dialog>
  </div>
</template>
<script>
import SourceDialog from "./sourceDialog";
import { provinceAndCityDataPlus } from "element-china-area-data";
import { provinceAndCityData } from "element-china-area-data"; // 不带全部选项
import { quillRedefine } from "vue-quill-editor-upload";

import regionDialog from "./RegionDialog";
import deliverDialog from "./DeliverDialog";
import PreviewDialog from "./PreviewDialog";
export default {
  components: {
    SourceDialog,
    quillRedefine,
    regionDialog,
    deliverDialog,
    PreviewDialog
  },
  data() {
    return {
      apiUrl: this.$api.apiUrl + "merchant/upload_goods_detail",
      defaulProps: { multiple: true },
      is_supplier: store.get("userInfo").is_supplier,
      ruleForm: {
        m_stock: "",
        m_min_order: "",
        m_deliver: ""
      },
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

        s_stock: [
          { required: true, message: "请输入商品库存", trigger: "blur" }
        ],
        s_min_order: [
          { required: true, message: "请输入起订量", trigger: "blur" }
        ],
        s_deliver: [
          { required: true, message: "请输入发货时间", trigger: "blur" }
        ]
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
      // 已有的
      goodsImgsSelect: [],
      // 子组件传回来的
      imgProps: [],
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
      priceType: "", //1 自营 2 分销,
      previewVisble: false,
      previewData: ""
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
    this.loadQueryData();
  },
  methods: {
    // 分类选择
    handleGoodsTypeChange(value) {
      this.formData.first_sort = value[0];
      this.formData.second_sort = value[1] - value[0];
    },

    // 添加图片
    imgsDialogHandle() {
      if (this.goodsImgsSelect.length < 5) {
        this.visible = true;
      } else {
        this.$message.error("选择图片不能超过5张");
      }
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
    // 删除自营地区
    delSeLfHandle(row) {
      let arr = this.selfPostageData;
      arr.splice(
        arr.findIndex(item => item.addId == row.addId || item.id == row.id),
        1
      );
      this.selfPostageData = arr;
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
        dist_price: this.formData.m_wholesale_price,
        addId: this.$common.getuuid()
      });
    },
    // 删除删除地区
    delMarketHandle(row) {
      let arr = this.marketPostage;
      arr.splice(
        arr.findIndex(item => item.addId == row.addId || item.id == row.id),
        1
      );
      this.marketPostage = arr;
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
        postage: row.postage + "",
        first_piece: row.first_piece,
        more_piece: row.more_piece
      };

      this.deliverVisible = true;
    },
    // 保存
    submitHandle(formName) {
      this.formData.self_postage = this.selfPostageData;
      this.formData.market_postage = this.marketPostage;

      this.$refs[formName].validate(valid => {
        if (valid) {
          //     this.formData.s_cost_price = (this.formData.s_cost_price - 0).toFixed(2);
          //     this.formData.s_sell_price = (this.formData.s_sell_price - 0).toFixed(2);
          //     this.formData.s_market_price = (this.formData.s_market_price - 0).toFixed(2);
          if (!this.selfPostageData.length) {
            this.$message.error({ message: "请设置自营销售价格" });
            return false;
          }
          if (this.is_supplier == "1" && this.formData.sales_mode == "2") {
            if (!this.marketPostage.length) {
              this.$message.error({ message: "请设置市场销售价格" });
              return false;
		}
		if(!this.formData.m_market_price){
			this.$message.error({ message: "请设置市场市场价" });
              return false;
		}
		if(!this.formData.m_cost_price){
			this.$message.error({ message: "请设置市场成本价" });
              return false;
		}
		if(!this.formData.m_wholesale_price){
			this.$message.error({ message: "请设置市场批发价" });
              return false;
		}
          }

          this.formData.pic_paths = this.goodsImgsSelect.map(
            (item, index) => item.pic_path
          );
          if (!this.formData.pic_paths.length) {
            this.$message.error({ message: "请上传商品图片" });
            return false;
          }
          if (this.formData.goods_detail == "") {
            this.$message.error({ message: "请填写商品详情" });
            return false;
          }
          if (this.priceCheck()) {
            this.loading = true;
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
          }
        } else {
          this.$message.error("请将信息填写完整");
          this.loading = false;
          return false;
        }
      });
    },
    // 路由带有query(编辑，第三方导入)
    loadQueryData() {
      //     处理从第三方导入过来时的情况
      if (this.$route.query.isExport) {
        let query = this.$route.query;
        let imgs = JSON.parse(this.$common.getUrlKey("goodsImgs"));
        imgs.map(item => {
          this.goodsImgsSelect.push({
            pic_path: item
          });
        });
        this.formData.goods_name = query.goodsName;
        this.formData.share_describe = query.description;
        this.formData.goods_detail = query.goodsDetail;
      }
      // 处理编辑
      if (this.$route.query.goodsId) {
        this.loading = true;
        this.$api
          .get("merchant/get_goods", {
            api_token: this.$api.getToken(),
            goods_id: this.$route.query.goodsId
          })
          .then(res => {
            if (res.data.code == 200) {
              let keys = Object.keys(this.formData);
              keys.map(key => {
                this.formData[key] = res.data.data.item[key]
                  ? res.data.data.item[key] + ""
                  : this.formData[key]; // int转string
              });

              res.data.data.goods_pic.map(item => {
                this.goodsImgsSelect.push({
                  pic_path: item
                });
              });
              this.goodsTypeSelect = [
                this.formData.first_sort - 0,
                this.formData.first_sort - 0 + (this.formData.second_sort - 0)
              ];
              let selfPostageData = res.data.data.self_postage;
              let marketPostage = res.data.data.market_postage;
              //   自营销售价格
              selfPostageData.map(self => {
                self.s_cost_price = this.formData.s_cost_price;
                self.s_sell_price = this.formData.s_sell_price;
                self.s_market_price = this.formData.s_market_price;
                self.s_mem_price = this.formData.s_mem_price;
                let arr = self.region.split(",");
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
                self.regionLabel = result.join(",");
              });
              //   市场销售价格
              marketPostage.map(self => {
                self.m_cost_price = this.formData.m_cost_price;
                self.m_market_price = this.formData.m_market_price;
                self.m_wholesale_price = this.formData.m_wholesale_price;
                self.dist_price = this.formData.m_wholesale_price;
                let arr = self.region.split(",");
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
                self.regionLabel = result.join(",");
              });
              this.selfPostageData = selfPostageData;
              this.marketPostage = marketPostage;
              //富文本编辑器神坑处理
              this.$nextTick(function() {
                this.$refs.myQuillEditor.quill.enable(true);
                this.$refs.myQuillEditor.quill.blur();
                document.body.scrollTop = 0;
                document.getElementById("wrap").scrollTop = 0;
              });
              this.loading = false;
            } else {
              this.$message.error({ message: res.data.msg });
            }
          })
          .catch(err => {
            this.$message.error({ message: err });
          });
      }
    },
    // 预览
    previewHandle() {
      this.formData.pics = this.goodsImgsSelect;
      let region = this.selfPostageData.map(item => item.regionLabel).join(",");
      this.formData.regionLabels = region;

      if (!this.formData.pics.length) {
        this.$message.error("请上传商品图片");
        return false;
      }
      if (this.formData.goods_name == "") {
        this.$message.error("请填写商品名称");
        return false;
      }
      if (this.formData.s_market_price == "") {
        this.$message.error("请填写市场价");
        return false;
      }
      if (this.formData.s_sell_price == "") {
        this.$message.error("请填写销售价");
        return false;
      }
      if (this.formData.s_min_order == "") {
        this.$message.error("请填写起订量");
        return false;
      }
      if (this.formData.goods_detail == "") {
        this.$message.error("请填写商品详情");
        return false;
      }
      let data = {
        api_token: this.$api.getToken(),
        pic_paths: this.formData.pics.map(item => item.pic_path),
        goods_name: this.formData.goods_name,
        s_market_price: this.formData.s_market_price,
        s_sell_price: this.formData.s_sell_price,
        s_min_order: this.formData.s_min_order,
        goods_detail: this.formData.goods_detail
      };
      if (this.priceCheck()) {
        this.postPreview(data);
      }
    },
    postPreview(data) {
      this.loading = true;
      this.$api
        .post("merchant/create_qrcode", data)
        .then(res => {
          if (res.data.code == 200) {
            this.previewData = JSON.stringify({
              ...this.formData,
              ewm: res.data.data
            });
            this.previewVisble = true;
          } else {
            this.$message.error({ message: res.data.msg });
          }
          this.loading = false;
        })
        .catch(err => {
          this.$message.error({ message: err });
          this.loading = false;
        });
    },
    //     价格限制
    priceCheck() {
      if (this.formData.s_cost_price - 0 >= this.formData.s_sell_price - 0) {
        this.$message.error("自营销售价不能小于自营成本价");
        return false;
      }
      if (this.formData.s_sell_price - this.formData.s_mem_price > 0) {
        this.$message.error("自营销售价不能大于自营会员价");
        return false;
      }
      if (this.formData.s_mem_price - this.formData.s_market_price > 0) {
        this.$message.error("自营会员价不能大于自营市场价");
        return false;
      }
      if (this.is_supplier == "1" && this.formData.sales_mode == "2") {
        if (
          this.formData.m_cost_price - 0 >=
          this.formData.m_wholesale_price - 0
        ) {
          this.$message.error("市场批发价不能小于市场成本价");
          return false;
        }
        if (
          this.formData.m_market_price - 0 <
          this.formData.m_wholesale_price - 0
        ) {
          this.$message.error("市场市场价不能大于市场批发价");
          return false;
        }
      }

      return true;
    }
  },
  watch: {
    //   图片
    imgProps(value) {
      this.goodsImgsSelect = this.goodsImgsSelect.concat(value);
    },
    // 运送地
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
              if (this.formData.m_wholesale_price) {
                this.$set(
                  item,
                  "dist_price",
                  value.first_piece - 0 + (this.formData.m_wholesale_price - 0)
                );
              }
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
        if (item.postage == 2) {
          item.dist_price = item.first_piece - 0 + (value - 0);
        } else {
          item.dist_price = value;
        }
      });
    }
    //    分销价
    //     "formData.m_dist_price"(value) {
    //       this.marketPostage.map(item => {
    //         item.m_dist_price = value;
    //       });
    //     }
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
.market-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9;
}
</style>
