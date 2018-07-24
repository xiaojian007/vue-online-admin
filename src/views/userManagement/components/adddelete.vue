<template>
  <div class="addDelete">
    <!-- Form -->
    <div class="border">
      <el-button icon="el-icon-plus" type="warning" @click="addProduct">新增</el-button>
      <el-button icon="el-icon-delete" :loading="deleteLoading" type="danger">删除</el-button>
      <span class="total">
        共：<b>{{total}}</b>件商品
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deleteLoading: false, // 删除加载
        total: '2444' // 总数
      }
    },
    methods: {
      addProduct() {
        const addOn = true
        this.$emit('add', addOn)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addDelete{
    margin-top: 20px;
    .border{
      border: 1px solid #ddd;
      padding: 10px;
      height: 60px;
      line-height: 36px;
      margin-bottom: 20px;
      .total{
        float: right;
        font-size: 14px;
        color: #393939;
        b{
          font-weight: bold;
        }
      }
    }
  }
</style>
