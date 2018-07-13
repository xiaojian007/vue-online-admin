<template>
  <div class="add-product">
    <h3 class="title">添加商品</h3>
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item :label-width='formLabelWidth' label="*图片标题：" prop="imgName">
        <el-input v-model="addForm.imgName"></el-input>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="简略标题：" prop="abbreviation">
        <el-input v-model="addForm.abbreviation"></el-input>
      </el-form-item>
      <div class="line">
        <el-form-item :label-width='formLabelWidth' label="产品编号：" prop="number">
          <el-input v-model="addForm.number" placeholder="产品编号"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="产 地：" prop="address">
          <el-input v-model="addForm.address" placeholder="产地"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="材 质：" prop="material">
          <el-input v-model="addForm.material" placeholder="材质"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="品 牌：" prop="brand">
          <el-input v-model="addForm.brand" placeholder="品牌"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="产品重量：" prop="weight">
          <el-input v-model="addForm.weight" placeholder="产品重量"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="展示价格：" prop="price">
          <el-input v-model="addForm.price" placeholder="展示价格"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="市场价格：" prop="marketPrice">
          <el-input v-model="addForm.marketPrice" placeholder="市场价格"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' label="种类" prop="region">
          <el-select v-model="addForm.region" placeholder="请选择商品种类">
            <el-option label="水果" value="fruit"></el-option>
            <el-option label="西瓜" value="watermelon"></el-option>
            <el-option label="蔬菜" value="vegetables"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item :label-width='formLabelWidth' label="关键字：" prop="keyword">
        <el-input v-model="addForm.keyword"></el-input>
      </el-form-item>
      <el-form-item :label-width='formLabelWidth' label="内容摘要：" prop="abstract">
        <el-input type="textarea" placeholder="说点什么...最少输入10个字符" v-model="addForm.abstract"></el-input>
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
      <el-form-item :label-width='formLabelWidth' label="详细内容：" prop="msg">
        <div>
          <Tinymce :height=400 ref="editor" v-model="addForm.msg"></Tinymce>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('addForm', addForm)">立即创建</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button @click="onBack('addForm')">取消</el-button>
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
      formLabelWidth: '100px',
      addForm: {
        imgName: '',
        abbreviation: '',
        number: '',
        address: '',
        material: '',
        brand: '',
        weight: '',
        price: '',
        marketPrice: '',
        region: '',
        keyword: '',
        abstract: '',
        imgBold: [],
        msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + tinymce4.7.13 + v-model双向绑定<img src="http://img.baidu.com/hi/jx2/j_0003.gif"/></h2>'
      },
      rules: {
        imgName: [
          { required: true, message: '请输入图片标题', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        abbreviation: [
          { required: true, message: '请输入简略标题', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入产品编号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入产地', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请输入材质', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入重量', trigger: 'blur' }
        ],
        marketPrice: [
          { required: true, message: '请输入市场价格', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入展示价格', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择种类', trigger: 'change' }
        ],
        keyword: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请填写内容摘要', trigger: 'blur' }
        ],
        msg: [
          { required: true, message: '请编辑详细内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName, addForm) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(addForm)
        } else {
          this.$message.error('您肯定少填写的一个或者多个内容')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
      console.log('图片上传成功获得base64')
      this.addForm.imgBold.push(response.files.file) // 把图片base64值push到数组中
      console.log(this.addForm.imgBold)
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
    },
    onBack(formName) {
      // this.$refs[formName].resetFields()
      this.$message({
        message: '已取消',
        type: 'success'
      })
      const addOn = false
      this.$emit('back', addOn)
    }
  },
  props: {
    modifyData: Object
  },
  watch: {
    modifyData(val) {
      this.addForm = val
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