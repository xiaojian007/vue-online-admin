<template>
  <div class="modifytable">
    <el-form :model="dataList" ref="dataList" label-width="80px" class="demo-dynamic">
        <el-form-item
          prop="charge"
          label="总负责人"
          :rules="[
            { required: true, message: '请输入负责人', trigger: 'blur' }
          ]"
          >
          <el-input v-model="dataList.charge"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="工单名称"
          :rules="[
            { required: true, message: '请输入工单名称', trigger: 'blur' }
          ]"
          >
          <el-input v-model="dataList.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="requirement"
          label="工单要求"
          :rules="[
            { required: true, message: '请输入工单要求', trigger: 'blur' }
          ]"
          >
          <el-input v-model="dataList.requirement"></el-input>
        </el-form-item>
        <el-form-item class="status" label="状态" prop="status">
          <el-select v-model="dataList.status" placeholder="请选择状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="确认中" value="确认中"></el-option>
            <el-option label="设计中" value="设计中"></el-option>
            <el-option label="未完成" value="未完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="status" label="重要性" prop="importance">
          <el-select v-model="dataList.importance" placeholder="请选择重要性">
            <el-option label="加急" value="加急"></el-option>
            <el-option label="一般" value="一般"></el-option>
            <el-option label="修改" value="修改"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="status" label="组别" prop="groups">
          <el-select v-model="dataList.groups" placeholder="请选择组别">
            <el-option label="电商组" value="电商组"></el-option>
            <el-option label="华北组" value="华北组"></el-option>
            <el-option label="华东组" value="华东组"></el-option>
            <el-option label="华南组" value="华南组"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          class="time"
          prop="time"
          label="项目时间"
          :rules="[
            { required: true, message: '请输入项目时间', trigger: 'blur' }
          ]"
          >
          <el-date-picker
            v-model="dataList.time"
            type="daterange"
            start-placeholder="项目开始"
            end-placeholder="项目结束"
            value-format='yyyy-MM-dd'>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dataList')">修改</el-button>
          <el-button @click="resetForm('dataList')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          console.log(this.dataList)
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
      var index = this.dataList.partner.indexOf(item)
      if (index !== -1) {
        this.dataList.partner.splice(index, 1)
      }
    }
  },
  watch: {
    dataList: function(val) {
      console.log(val)
    }
  }
}
</script>
