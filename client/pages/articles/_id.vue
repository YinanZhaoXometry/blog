
<template>
  <section class="markdown-body">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <h1>{{ article.title }}</h1>
        <p>{{ article.author }} 发表在：{{ article.category.cnName }} 分类下 {{ article.createTime.fullDate }}</p>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <p v-if="!article">努力加载中...</p>
        <div v-html="article.htmlContent" />
        <el-row>
          <el-button
            v-for="tag in article.tags"
            :key="tag._id"
            size="mini"
          >
            <nuxt-link :to="`/tags/${tag._id}`">
              {{ tag.name }}
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
    <el-row type="flex" justify="space-around">
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
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'

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
    try {
      let {data} = await app.$axios.get(`/api/articles/${params.id}`)
      let {article} = data
      return {article}
    } catch (err) {
      this.$message.error(err)
    }
  },

  async fetch ({ params, store }) {
    await store.dispatch('comments/fetchCommentList', params.id)
  },

  layout: 'article',

  mounted () {
    this.readUserCache()
    // 选择性加载 highlight 样式
    hljs.registerLanguage( 'javascript', require('highlight.js/lib/languages/javascript') )
    hljs.registerLanguage( 'typescript', require('highlight.js/lib/languages/typescript') )
    hljs.registerLanguage( 'json', require('highlight.js/lib/languages/json') )
    hljs.registerLanguage( 'css', require('highlight.js/lib/languages/css') )
    hljs.registerLanguage( 'html', require('highlight.js/lib/languages/xml') )
    hljs.registerLanguage( 'bash', require('highlight.js/lib/languages/bash') )
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
        try {
          let {data} = await this.$axios.put(`/api/articles/like/${this.article._id}`)
          this.article.likes++
          this.likedArticles.push(this.article._id)
        } catch (err) {
          this.$message.error('文章点赞失败，' + err)
        }
      } else {
        try {
          let {data} = await this.$axios.delete(`/api/articles/like/${this.article._id}`)
          this.article.likes--
          let index = this.likedArticles.findIndex(element => Object.is(element, this.article._id))
          this.likedArticles.splice(index, 1)
        } catch (err) {
          this.$message.error(err)
        }
      }
      window.localStorage.setItem('liked_articles', JSON.stringify(this.likedArticles))
    }
  },

  // SEO优化，见 https://nuxtjs.org/api/pages-head#the-head-method
  head () {
      let keywordsStr = `${this.article.category.cnName}`
      if(!this.article.tags)
        keywordsStr = keywordsStr + this.article.tags.join(', ')
      return {
        title: this.article.title,
        meta: [
          { name: 'description', content: this.article.description },
          { name: 'author', content: this.article.author },
          { name: 'keywords', content: keywordsStr }
        ]
      }
    }
}
</script>

<style>
  @import 'github-markdown-css';
  @import 'highlight.js/styles/atom-one-light.css';

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 700px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
