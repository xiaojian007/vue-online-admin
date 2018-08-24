<template>
  <div class="app-container">
    <!-- 搜索查询 -->
    <div class="search-style">
      <div class="title-names">搜索查询</div>
      <div class="demo-input-suffix">
        <el-input placeholder="素材名" v-model="listName">
        </el-input>
        <!-- <el-input placeholder="蔬菜" v-model="Executor">
        </el-input> -->
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-download">导出</el-button> -->
        <span class="right">共计：{{totalNub}}个素材</span>
      </div>
    </div>
    <el-radio-group v-model="showcaseradio" v-on:change="showcaseChange">
      <el-radio v-for="(item, index) in showcases" :key="index" :label="item.label" border>{{item.value}}</el-radio>
    </el-radio-group>
    <div class="showcase-box ">
      <div class="showcase-item" v-for="(item, index) in showcaseitem" :key="index">
        <img :src="item.src">
        <div class="article-title">{{item.author}}：{{item.title}}</div>
        <div class="hover">
          <div class="bg"></div>
          <div class="link">
            <p>{{item.title}}</p>
            <a :href="item.href" target="_blank">预览效果</a>
          </div>
        </div>
      </div>
    </div>
    <el-pagination @current-change="handleCurrentChange" background :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'advertisement',
  data() {
    return {
      totalNub: '500',
      total: 10,
      pageSize: 1,
      listName: '',
      Executor: '',
      showcaseradio: '1',
      showcases: [{
        label: '1',
        value: '全部'
      }, {
        label: '2',
        value: 'AE丨动画模板'
      }, {
        label: '3',
        value: 'AE丨脚本素材'
      }, {
        label: '4',
        value: 'C4D丨建筑场景'
      }, {
        label: '5',
        value: 'C4D丨人车元素'
      }, {
        label: '6',
        value: '插画丨笔刷素材'
      }, {
        label: '7',
        value: '入门教程'
      }],
      showcaseitem: [{
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }, {
        src: 'http://www.bitauto.com/topics/ad_topic/Material_library/images/001.jpg',
        title: '11组婚礼文字标题动画',
        author: '小贱',
        href: 'http://www.bitauto.com/topics/ad_topic/Material_library/content/AE/001/index.shtml'
      }]
    }
  },
  methods: {
    showcaseChange(val) {
      console.log(val)
    },
    handleCreate() {
    },
    // 分页切换
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .search-style {
    border: 1px solid #ddd;
    padding: 30px 20px;
    position: relative;
    margin-top: 20px;
    .title-names {
      position: absolute;
      top: -20px;
      font-size: 18px;
      background-color: #ffffff;
      padding: 5px 20px;
      left: 10px;
    }
    .demo-input-suffix {
      .right {
        float: right;
        color: #f00;
        margin-left: 20px;
        line-height: 40px;
      }
      .el-input {
        width: 250px;
      }
    }
  }
  .el-radio-group {
    padding: 20px 20px 20px 0;
  }
  .showcase-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .showcase-item {
      width: 300px;
      height: 220px;
      background: #fff;
      position: relative;
      margin: 0 35px 20px 0;
      box-shadow: 5px 10px 10px #d0d0d0;
      img {
        width: 300px;
      }
      .article-title {
        width: 280px;
        margin-left: 10px;
        height: 40px;
        line-height: 38px;
        color: #2b2b2b;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        opacity: 0;
        transition: all 0.3s linear;
        .bg {
          position: absolute;
          z-index: 1;
          background: #000;
          width: 300px;
          height: 220px;
          filter: alpha(opacity=85);
          opacity: 0.85;
        }
        .link {
          position: absolute;
          z-index: 2;
          color: #fff;
          width: 100%;
          p {
            height: 60px;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 30px;
            line-height: 18px;
            text-indent: 0px;
            font-size: 20px;
            line-height: 28px;
            text-align: center;
          }
          a {
            display: block;
            width: 220px;
            height: 40px;
            line-height: 40px;
            background: #fff;
            text-align: center;
            margin-left: 40px;
            -moz-border-radius: 20px;
            -webkit-border-radius: 20px;
            border-radius: 20px;
            color: #000;
          }
          a:hover {
            background: #e95a44;
            color: #fff;
            text-decoration: none;
          }
        }
      }
      .hover:hover {
        opacity: 1;
      }
    }
  }
  .el-pagination {
    padding: 20px 10px 20px 0;
    text-align: center;
  }
}
</style>