<template>
  <div class="add-product">
    <h3 class="title">添加商品</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label-width='formLabelWidth' label="*图片标题：">
        <el-input v-model="form.imgName"></el-input>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="简略标题：">
        <el-input v-model="form.abbreviation"></el-input>
      </el-form-item>
      <div class="line">
        <el-form-item :label-width='formLabelWidth' label="产品编号：">
          <el-input v-model="form.number" placeholder="产品编号"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="产 地：">
          <el-input v-model="form.address" placeholder="产地"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="材 质：">
          <el-input v-model="form.material" placeholder="材质"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="品 牌：">
          <el-input v-model="form.brand" placeholder="品牌"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="产品重量：">
          <el-input v-model="form.weight" placeholder="产品重量"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="展示价格：">
          <el-input v-model="form.price" placeholder="展示价格"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="市场价格：">
          <el-input v-model="form.marketPrice" placeholder="市场价格"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="种类">
          <el-select v-model="form.region" placeholder="请选择商品种类">
            <el-option label="水果" value="fruit"></el-option>
            <el-option label="西瓜" value="watermelon"></el-option>
            <el-option label="蔬菜" value="vegetables"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item :label-width='formLabelWidth' label="关键字：">
        <el-input v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="内容摘要：">
        <el-input type="textarea" placeholder="说点什么...最少输入10个字符" v-model="form.abstract"></el-input>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="图片上传：">
        <el-upload 
          action="https://httpbin.org/post" 
          list-type="picture-card" 
          :on-preview="handlePictureCardPreview" 
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="详细内容：">
        <div>
          <Tinymce :height=400 ref="editor" v-model="form.msg"></Tinymce>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        imgName: '',
        abbreviation: '',
        number: '',
        address: '',
        material: '',
        brand: '',
        weight: '',
        price: '',
        marketPrice: '',
        keyword: '',
        abstract: '',
        imgBold: [],
        msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + tinymce4.7.13 + v-model双向绑定<img src="http://img.baidu.com/hi/jx2/j_0003.gif"/></h2>'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      console.log(response.files.file)
      this.form.imgBold.push(response.files.file)
      console.log(this.form.imgBold)
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message({
        showClose: true,
        message: '图片上传失败',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile .el-form-item {
    width: 100%;
  }
  .add-product {
    margin-top: 20px;
    .title {
      background-image: linear-gradient(to bottom, #ffffff 0, #ededed 100%)!important;
      height: 40px;
      line-height: 40px;
      color: #333333;
      width: 100%;
      padding-left: 20px;
      font-size: 18px;
      border-bottom: 1px solid #dddddd;
    }
    .line {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>