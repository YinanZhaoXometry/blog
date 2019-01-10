
<template>
  <section>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="12">
        <h2>{{ article.title }}</h2>
        <p>{{ article.author }} 发表在：{{ article.category.cnName }} 分类下 {{ article.createTime.fullDate }}</p>
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
            <nuxt-link :to="`/tags/${tag}`">
              {{ tag }}
            </nuxt-link>
          </el-button>
          <el-button round @click="likeArticle">
            <i :class="['iconfont', isArticleLiked ? 'icon-like' : 'icon-like1']" />
            {{ article.likes ? article.likes + '人赞' : '赞' }}
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
  data () {
    return {
      likedArticles: []
    }
  },
  computed: {
    isArticleLiked () {
      return this.likedArticles.includes(this.article._id)
    }
  },
  async asyncData ({ app, params }) {
    let {data} = await app.$axios.get(`/api/articles/${params.id}`)
    let {article} = data
    return {article}
  },

  async fetch ({ params, store }) {
    await store.dispatch('comments/fetchCommentList', params.id)
  },

  layout: 'article',
  mounted () {
    this.readUserCache()
  },

  methods: {
    readUserCache () {
      if (window.localStorage) {
        let likedArticles = window.localStorage.getItem('liked_articles')
        if (likedArticles) this.likedArticles = JSON.parse(likedArticles)
      }

    },

    async likeArticle () {
      if( !this.isArticleLiked ) {
        let {data} = await this.$axios.put(`/api/articles/like/${this.article._id}`)
        if (data.success) {
          // this.$store.commit('likeArticle', this.article._id)
          this.article.likes++
          this.likedArticles.push(this.article._id)
        } else this.$message.error('文章点赞失败')
      } else {
        console.log(this.article._id)
        let {data} = await this.$axios.delete(`/api/articles/like/${this.article._id}`)
        if (data.success) {
          // this.$store.commit('dislikeArticle', this.article._id)
          this.article.likes--
          let index = this.likedArticles.findIndex(element => Object.is(element, this.article._id))
          this.likedArticles.splice(index, 1)
        }
      }
      window.localStorage.setItem('liked_articles', JSON.stringify(this.likedArticles))
    },

  }
}
</script>
