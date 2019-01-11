<template>
  <el-container>
    <el-header><my-header /></el-header>
    <el-container>
      <el-aside>
        <side-panel />
      </el-aside>
      <el-main>
        <router-view>1</router-view>
      </el-main>
    </el-container>
    <el-footer><my-footer /></el-footer>
  </el-container>
</template>

<script>
import MyHeader from './public/Header.vue'
import MyFooter from './public/Footer.vue'
import SidePanel from './public/SidePanel.vue'
export default {
  components: {
    MyHeader,
    MyFooter,
    SidePanel
  },
  created () {

  }
}
</script>
