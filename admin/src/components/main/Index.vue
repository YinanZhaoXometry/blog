<template>
  <el-container>
    <el-header><my-header /></el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="/main/list"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/main/list">
            <i class=" el-icon-tickets" />
            <span>文章列表</span>
          </el-menu-item>
          <el-menu-item
            index="post"
          >
            <i class="el-icon-edit" />
            <span>发表文章</span>
          </el-menu-item>
          <el-menu-item index="/main/categories">
            <i class="el-icon-menu" />
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/main/tags">
            <i class="el-icon-star-off" />
            <span>文章标签</span>
          </el-menu-item>
          <el-menu-item index="/main/google">Google Analytics</el-menu-item>
          <el-menu-item index="/main/settings">
            <i class="el-icon-setting" />
            <span>全局设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view>1</router-view></el-main>
    </el-container>
    <el-footer><my-footer /></el-footer>
  </el-container>
</template>

<script>
import MyHeader from '../public/Header.vue'
import MyFooter from '../public/Footer.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  },

}
</script>
