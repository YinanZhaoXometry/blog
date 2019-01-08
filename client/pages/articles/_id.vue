
<template>
  <section>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="12">
        <h2>{{ article.title }}</h2>
        <p>{{ article.author }} 发表在：{{ article.category }}下 {{ article.createTime }} {{ article.tags }}</p>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="12">
        <p v-if="!article">努力加载中...</p>
        <p>{{ article.content }}</p>
        <el-row>
          <el-button
            v-for="tag in article.tags"
            :key="tag"
            size="mini"
          >
            {{ article.tags }}
          </el-button>
          <el-button round>
            <i class="iconfont icon-like1" />
            {{ 10 }}
          </el-button>
          <el-button icon="el-icon-view" round>
            {{ article.views }}
          </el-button>
        </el-row>
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
    <comment :article-id="article._id" />
  </section>
</template>

<script>
import Comment from '~/components/comment/Index.vue'
export default {
  components: {
    Comment
  },
  async asyncData ({ app, params }) {
    let {data} = await app.$axios.get(`/api/articles/${params.id}`)
    let {article} = data
    return {article}
  },

  async fetch ({ params, store }) {
    await store.dispatch('comments/fetchCommentList', params.id)
  },

  layout: 'article'
}
</script>
