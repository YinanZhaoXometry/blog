<template>
  <el-container>
    <el-header><my-header /></el-header>
    <el-container>
      <el-aside>
        <side-panel />
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
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
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
