<template>
  <div class="addtable">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
      <el-form-item prop="charge" label="总负责人" :rules="[
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ]">
        <el-input v-model="dynamicValidateForm.charge"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="工单名称" :rules="[
          { required: true, message: '请输入工单名称', trigger: 'blur' }
        ]">
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="requirement" label="工单要求" :rules="[
          { required: true, message: '请输入工单要求', trigger: 'blur' }
        ]">
        <el-input v-model="dynamicValidateForm.requirement"></el-input>
      </el-form-item>
      <el-form-item class="status" label="状态" prop="status">
        <el-select v-model="dynamicValidateForm.status" placeholder="请选择状态">
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="确认中" value="确认中"></el-option>
          <el-option label="设计中" value="设计中"></el-option>
          <el-option label="未完成" value="未完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="status" label="重要性" prop="importance">
        <el-select v-model="dynamicValidateForm.importance" placeholder="请选择重要性">
          <el-option label="加急" value="加急"></el-option>
          <el-option label="一般" value="一般"></el-option>
          <el-option label="修改" value="修改"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item class="status" label="组别" prop="group">
        <el-select v-model="dynamicValidateForm.group" placeholder="请选择组别">
          <el-option label="电商组" value="电商组"></el-option>
          <el-option label="华北组" value="华北组"></el-option>
          <el-option label="华东组" value="华东组"></el-option>
          <el-option label="华南组" value="华南组"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="time" prop="time" label="项目时间" :rules="[
          { required: true, message: '请输入项目时间', trigger: 'blur' }
        ]">
        <el-date-picker v-model="dynamicValidateForm.time" type="daterange" start-placeholder="项目开始" end-placeholder="项目结束" value-format='yyyy-MM-dd'>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        partner: [{
          name: '',
          requirement: '',
          project: '',
          butt: '',
          progress: '',
          time: []
        }],
        id: '',
        group: '',
        time: [],
        name: '',
        charge: '',
        requirement: '',
        butt: '',
        status: '',
        importance: ''
      }
    }
  },
  props: {
    dataList: {
      default: ''
    }
  },
  methods: {
    // 提交信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置信息
    resetForm(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.partner.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.partner.splice(index, 1)
      }
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.demo-dynamic::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.demo-dynamic::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.demo-dynamic::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.demo-dynamic {
  overflow: auto;
  .el-input {
    width: 95.6%;
  }
  .status {
    width: 25%;
    display: inline-block;
  }
  .time {
    width: 37%;
    display: inline-block;
    .el-date-editor {
      width: 90%;
    }
  }
  .el-form-contents {
    .el-input {
      width: 22%;
      margin: 0 20px 10px 0;
    }
    .el-date-editor {
      width: 46.5%;
    }
    .el-button--danger {
      margin-left: 20px;
      height: 40px;
    }
    .progress {
      margin-top: 10px;
      width: 95.6%;
    }
  }
}
</style>
