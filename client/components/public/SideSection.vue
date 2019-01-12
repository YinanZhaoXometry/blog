<template>
  <section>
    <!-- 作者信息 -->
    <el-row>
      <el-card>
        <h4>作者信息</h4>
        <p>赵一楠</p>
        <p>Learn from mistakes</p>
        <span>日志</span><span>3</span><br>
        <span>分类</span><span>4</span><br>
        <i>Github Icon</i><br>
        <i>Weibo Icon</i><br>
      </el-card>
    </el-row>

    <!-- 热门文章 -->
    <el-row>
      <el-card>
        <h4>热门文章</h4>
        <hr>
        <nuxt-link
          v-for="item in popularArticleList"
          :key="item._id"
          :to="{path: `/articles/${item._id}`}"
        >
          <i class="el-icon-edit" />&nbsp;&nbsp;{{ item.title }} <br>
        </nuxt-link>
      </el-card>
    </el-row>
  </section>
</template>
<script>
export default {
  components: {
  },
  props: {

  },
  computed: {
    popularArticleList() {
      return this.$store.state.popularList
    }
  }
}
</script>
