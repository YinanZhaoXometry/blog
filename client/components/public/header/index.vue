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
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item
          v-for="item in categories"
          :key="item.nameEN"
          :index="item.nameEN"
        >
          {{ item.nameCN }}
        </el-menu-item>
        <el-menu-item index="archive">归档</el-menu-item>
        <el-menu-item index="about">关于</el-menu-item>
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
      activeIndex: 'home',
      categories: []
    }
  },
  created: async function () {
    let {data} = await this.$axios.get('http://localhost:3030/api/categories')
    this.categories = data.result
  },

  methods: {
      handleSelect(key) {
        this.$router.push(key)
      }
  }
}
</script>
