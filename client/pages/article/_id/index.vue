<template>
  <section>
    <el-row>
      <el-col :span="14">
        <h3>{{ article.title }}</h3>
        <p>发布时间 文章分类 标签</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <p v-show="!article">努力加载中...</p>
        <p>{{ article.content }}</p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import {serverUrl} from '~/config/serverUrl'
export default {
  async asyncData ({app, params}) {
    let {data} = await app.$axios.get(`${serverUrl}/api/article/${params.id}`)
    let {article} = data
    return {article}
  }
}
</script>
