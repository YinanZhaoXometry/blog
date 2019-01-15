<template>
  <div>
    <el-row justyfy="center" type="flex">
      <el-col :span="20">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/categories/front-end">前端</el-menu-item>
          <el-menu-item index="/categories/back-end">后端</el-menu-item>
          <el-menu-item index="/archive">归档</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索酷核"
          @keyup.native.enter="search"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="search"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
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
      categories: [],
      searchKeyword: ''
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    },

    search () {
      if (this.searchKeyword.trim()) {
        this.$router.push(`/search/${this.searchKeyword}`)
      }
    }


  }
}
</script>
