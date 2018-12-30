<template>
  <div>
    <el-row
      justyfy="center"
      type="flex"
    >
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">分类</el-menu-item>
        <el-menu-item index="3">归档</el-menu-item>
        <el-menu-item index="4">关于</el-menu-item>
      </el-menu>
      <div class="line" />
    </el-row>
    <el-row>
      <el-col>
        <nuxt-link to="/"><b>KuHe 酷核</b></nuxt-link>
        <span>学习编程永远都不晚</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push("/")
      }
  }
}
</script>
