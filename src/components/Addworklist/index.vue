<template>
  <div class="addtable">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
      <el-form-item
        prop="charge"
        label="总负责人"
        :rules="[
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ]"
        >
        <el-input v-model="dynamicValidateForm.charge"></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="工单名称"
        :rules="[
          { required: true, message: '请输入工单名称', trigger: 'blur' }
        ]"
        >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="requirement"
        label="工单要求"
        :rules="[
          { required: true, message: '请输入工单要求', trigger: 'blur' }
        ]"
        >
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
      <el-form-item
        class="time"
        prop="time"
        label="项目时间"
        :rules="[
          { required: true, message: '请输入项目时间', trigger: 'blur' }
        ]"
        >
        <el-date-picker
          v-model="dynamicValidateForm.time"
          type="daterange"
          start-placeholder="项目开始"
          end-placeholder="项目结束"
          value-format='yyyy-MM-dd'>
        </el-date-picker>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.partner"
        :label="'分配人' + (index + 1)"
        :key="domain.key"
        :prop="'partner.' + index + '.value'"
        class="el-form-contents"
        >
        <el-input v-model="domain.project" placeholder="项目名称"></el-input>
        <el-input v-model="domain.name" placeholder="项目负责人"></el-input>
        <el-input v-model="domain.requirement" placeholder="备注"></el-input>
        <el-input v-model="domain.butt" placeholder="对接人"></el-input><br />
        <el-date-picker
          v-model="domain.time"
          type="daterange"
          start-placeholder="项目开始"
          end-placeholder="项目结束"
          value-format='yyyy-MM-dd'>
        </el-date-picker>
        <el-button @click.prevent="removeDomain(domain)" type="danger" icon="el-icon-delete">删除</el-button><br />
        <el-input v-model="domain.progress" type="textarea" class="progress" placeholder="项目进度"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增分配人</el-button>
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
    // 添加信息
    addDomain() {
      this.dynamicValidateForm.partner.push({
        value: '',
        key: Date.now()
      })
    },
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
