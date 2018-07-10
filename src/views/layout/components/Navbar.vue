<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- 导航二 -->
    <breadcrumb></breadcrumb>
    <!-- 消息 -->
    <div class="el-dropdown-ems">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-badge :value="200" :max="99" class="item">
            <el-button size="small">消息</el-button>
          </el-badge>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>新闻评论</el-dropdown-item>
          <el-dropdown-item>新订单</el-dropdown-item>
          <el-dropdown-item>粉丝</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 用户 -->
    <span class="current-time">当前时间：{{currentTimeNum}}</span>
    <el-dropdown class="avatar-container" @visible-change="clickSideBar" trigger="click">
      <div class="avatar-wrapper">
        <span class="user-avatar">{{name}}</span>
        <i class="el-icon-caret-bottom" :class="{active : iconSideBar}"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            设置
          </el-dropdown-item>
          <el-dropdown-item>
            个人资料
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentTime } from '@/utils/index'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      iconSideBar: false,
      currentTimeNum: ''
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'name',
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    clickSideBar(val) {
      this.iconSideBar = val
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    countDown() {
      setInterval(() => {
        this.currentTimeNum = currentTime(new Date())
      }, 1000)
    }
  },
  created() {
    this.countDown()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .mobile{
    .navbar{
      .current-time{
        display: none;
      }
      .el-dropdown-ems{
        right: 100px !important;
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
em{font-style: normal;}
.navbar {
  height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
      }
      .el-icon-caret-bottom,
      .el-icon-caret-top {
        position: absolute;
        right: -20px;
        top: 16px;
        font-size: 18px;
      }
    }
  }
  .current-time{
    position: absolute;
    top: 0;
    right: 100px;
    font-size: 14px;
    line-height: 50px;
  }
  .el-dropdown-ems{
    position: absolute;
    top: 9px;
    right: 385px;
    cursor: pointer;
    .ems{
      display: inline-block;
      text-shadow: none;
      font-size: 12px;
      width: 18px;
      color:#fff;
      text-align: center;
      padding: 3px;
      border-radius: 50%;
      font-weight: normal;
      line-height: 12px;
      background: #d15b47;
    }
  }
}
</style>

