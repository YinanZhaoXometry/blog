<template>
  <section>
    <el-menu
      default-active="overview"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleLogout"
    >
      <el-menu-item index="overview">
        <i class="el-icon-view" />
        <span>概览</span>
      </el-menu-item>
      <el-menu-item index="list">
        <i class="el-icon-tickets" />
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item
        index="post"
      >
        <i class="el-icon-edit" />
        <span>写文章</span>
      </el-menu-item>
      <el-menu-item index="categories">
        <i class="el-icon-menu" />
        <span>文章分类</span>
      </el-menu-item>
      <el-menu-item index="google">Google Analytics</el-menu-item>
      <el-menu-item index="settings">
        <i class="el-icon-setting" />
        <span>全局设置</span>
      </el-menu-item>
      <el-menu-item index="logout">退出登录</el-menu-item>
    </el-menu>
  </section>
</template>

<script>
export default {
  methods: {
    async handleLogout (index) {
      if (index === 'logout') {
        let {data} = await this.$axios.get('/api/logout')
        window.localStorage.removeItem('isUserLogin')
        this.$message.success(data.message)
        this.$router.push('/login')
      }
      else this.$router.push(`/${index}`)
    }
  }

}
</script>
