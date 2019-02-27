<template>
  <section>
    <article-card v-if="articleList" :article-list="articleList" :image-path-prefix="imagePathPrefix" />
    <!-- 加载动画 -->
    <div v-else class="sk-double-bounce">
      <div class="sk-child sk-double-bounce1" />
      <div class="sk-child sk-double-bounce2" />
    </div>
    <div class="loadmore-container">
      <el-button
        v-if="isLoading"
        :loading="true"
        plain
        class="loadmore-isloading"
      >
        加载中
      </el-button>
      <el-button
        v-else
        v-show="!isLastPage"
        plain
        class="loadmore-button"
        @click="loadMore"
      >
        加载更多
      </el-button>
      <p v-show="isLastPage" class="loadmore-nomore">---没有更多文章了---</p>
    </div>
  </section>
</template>

<script>
import ArticleCard from '~/components/public/ArticleCard.vue'
import {Bus} from '~/components/public/EventBus'
export default {
  components: {
    ArticleCard
  },

  data () {
    return {
      pageNum: 1,
      isLoading: false,
      pageSize: 6
    }
  },
  computed: {
    // 计算总页数
    totalPageCount () {
      return this.totalArticleCount % this.pageSize === 0
              ? this.totalArticleCount / this.pageSize
              : parseInt(this.totalArticleCount / this.pageSize + 1)
    },
    // 判断是否为最后一页
    isLastPage () {
      return this.pageNum === this.totalPageCount
    }
    // 计算发表日期显示格式，如文章发表年份为今年，则不显示年份
  },

  // 向文章 api 请求数据，将获取到的数据保存至 store 中
  async asyncData ({ app, store }) {
    try {
      let getArticles = app.$axios.get(`/api/articles`, { params: {pageSize:6} })
      let getPopularArticles = app.$axios.get(`/api/popularArticles`, { params: {pageSize:5} })
      let [responseA, responseB] = await Promise.all( [getArticles, getPopularArticles] )
      let { articleList, totalArticleCount, imagePathPrefix } = responseA.data
      let {popularList} = responseB.data
      store.commit("getPopularList", popularList)
      return {articleList, totalArticleCount, imagePathPrefix}
    } catch (err) {
      console.log(err)
      let articleList = null
      return {articleList}
    }
  },
  mounted () {
    Bus.$emit('DataTransfer', this.totalArticleCount)
  },
  methods:{
    loadMore: async function () {
      this.isLoading = true
      if (this.pageNum < this.totalPageCount) {
        this.pageNum++
        let {data} = await this.$axios.get(
          `/api/articles`,
          { params: {pageNum: this.pageNum, pageSize: this.pageSize} }
        )
        let {articleList} = data
        this.articleList = this.articleList.concat(articleList)
      }
      this.isLoading = false
    },

    getDate (item) {
      let currentYear = new Date().getFullYear()
      let date
      return date =
        item.createTime.year === currentYear
        ? item.createTime.simpleDate
        : item.createTime.fullDate
    },

    // SEO优化，见 https://nuxtjs.org/api/pages-head#the-head-method
    head () {
      return {
        title: '酷核 KuHe.io',
        meta: [
          { name: 'description', content: '30岁辞职学习编程，才发现只要人决定做一件事以后，多晚开始都不算晚。我将在这里分享编程学习中的一些思考和心路历程' },
          { name: 'author', content: '赵一楠' },
          { name: 'keywords', content: '编程, 自学, 转行, 学习'}
        ]
      }
    }
  }
}


</script>


<style>
.sk-double-bounce {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 40px auto; }
  .sk-double-bounce .sk-child {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #1D365D;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-doubleBounce 2s infinite ease-in-out;
            animation: sk-doubleBounce 2s infinite ease-in-out; }
  .sk-double-bounce .sk-double-bounce2 {
    -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s; }
@-webkit-keyframes sk-doubleBounce {
  0%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0); }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1); } }
@keyframes sk-doubleBounce {
  0%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0); }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1); } }
</style>
