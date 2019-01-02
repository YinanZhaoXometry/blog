
<template>
  <section>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="12">
        <h2>{{ article.title }}</h2>
        <p>{{ article.author }} {{ article.time.fullDate }} {{ article.category }} {{ article.tags }}</p>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="12">
        <p v-if="!article">努力加载中...</p>
        <p>{{ article.content }}</p>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="space-around"
    >
      <el-col :span="2">
        <nuxt-link to="/">
          <i class="el-icon-arrow-left" />上一篇文章
        </nuxt-link>
      </el-col>
      <el-col :span="2">
        <nuxt-link to="/">
          下一篇文章<i class="el-icon-arrow-right" />
        </nuxt-link>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import {serverUrl} from '~/config/serverUrl'
export default {
  async asyncData ({app, params}) {
    let {data} = await app.$axios.get(`/api/article/${params.id}`)
    let {article} = data
    return {article}
  },

  layout: 'article'
}
</script>
