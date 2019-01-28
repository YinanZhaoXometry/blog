<template>
  <section>
    <!-- 作者信息 -->
    <el-card class="sidebar-card" :body-style="[{ padding: '5px 20px 20px'}, {'text-align': 'center'}]">
      <h4><i class="iconfont icon-guanyuwomen" /> 作者信息</h4>
      <hr>
      <nuxt-link to="/about">
        <p>赵一楠</p>
      </nuxt-link>
      <p>Learn from mistakes</p>
      <nuxt-link to="/archive" class="hover-underline">
        <p>
          <span>日志</span>
          <span>3</span>
        </p>
      </nuxt-link>
      <p>
        <a href="https://github.com/zhaoyn7">
          <i class="iconfont icon-github" style="font-size:25px" />
        </a>
      </p>
    </el-card>
    <!-- 热门文章 -->
    <el-card class="sidebar-card" :body-style="[{ padding: '5px 20px 20px'}, {'text-align': 'center'}]">
      <h4><i class="iconfont icon-popular" /> 热门文章</h4>
      <hr>
      <ul class="article-list">
        <nuxt-link
          v-for="item in popularArticleList"
          :key="item._id"
          :to="{path: `/articles/${item._id}`}"
          class="hover-underline"
        >
          <li>
            {{ item.title }}
          </li>
        </nuxt-link>
      </ul>
    </el-card>
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
