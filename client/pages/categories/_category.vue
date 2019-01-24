<template>
  <section>
    <article-card :article-list="articleList" :image-path-prefix="imagePathPrefix" />
    <div class="loadmore">
      <el-button
        v-if="isLoading"
        size="small"
        :loading="true"
      >
        加载中
      </el-button>
      <el-button
        v-else
        v-show="!isLastPage"
        type="primary"
        plain
        size="small"
        @click="loadMore"
      >
        加载更多
      </el-button>
      <p v-show="isLastPage">---没有更多文章了---</p>
    </div>
  </section>
</template>

<script>
import ArticleCard from '~/components/public/ArticleCard.vue'

export default {
  components: {
    ArticleCard
  },

  data () {
    return {
      isLoading: false,
      pageNum: 1,
      pageSize: 3
    }
  },

  computed: {
    // 计算总页数
    totalPageCount () {
      return this.cateArticleCount % this.pageSize === 0
        ? this.cateArticleCount / this.pageSize
        : parseInt( this.cateArticleCount / this.pageSize + 1 )
    },
    // 判断是否为最后一页
    isLastPage () {
      return this.pageNum === this.totalPageCount
    }
  },

  async asyncData ({app, params, store}) {
    try {
      let {data} = await app.$axios.get(
        `/api/categories/${params.category}`,
        { params: {pageSize: 3} }
      )
      let { categoryObj, cateArticleCount, imagePathPrefix } = data
      let articleList = categoryObj.articles
      let category = {
        cnName: categoryObj.cnName,
        enName: categoryObj.enName,
        description: categoryObj.description
      }
      return { articleList, category, cateArticleCount, imagePathPrefix }
    } catch (err) {
      this.$message.error(err)
    }
  },

  async fetch ({app, store}) {
    if ( store.state.popularList.length === 0 ) {
      let {data} = await app.$axios.get(
        `/api/popularArticles`,
        { params: {pageSize:5} }
      )
      let {popularList} = data
      console.log(popularList)
      store.commit("getPopularList", popularList)
    }
  },

  methods: {
    loadMore: async function () {
      try {
        this.isLoading = true
        if (this.pageNum < this.totalPageCount) {
          this.pageNum++
          let {data} = await this.$axios.get(
            `/api/categories/${this.category.enName}`,
            { params: {pageNum: this.pageNum, pageSize: this.pageSize} }
          )
          let {categoryObj} = data
          console.log(categoryObj)
          this.articleList.concat(categoryObj.articles)
          this.isLoading = false
        }
      } catch (err) {
        this.$message.error(err)
      }
    },
  },

  head () {
    return {
      title: `${this.$store.state.category.cnName} | 酷核`,
      meta: [
        { name: 'description', content: '30岁辞职学习编程，只想说决定要做一件事情以后，多晚开始都不算晚。我将在这里分享编程学习中的一些思考和心路历程' },
        { name: 'author', content: '赵一楠' },
        { name: 'keywords', content: '编程, 自学, 转行, 学习'}
      ],
    }
  }
}

</script>
