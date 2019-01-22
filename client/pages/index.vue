<template>
  <section>
    <!-- <el-card
      v-for="item in articleList"
      :key="item._id"
      shadow="always"
      class="card-article"
      :body-style="[{ padding: '0px'},{width: '100%' },{display: 'flex'}]"
    >
      <div class="card-text">
        <span class="text-tag">
          <el-tag :type="item.isOriginal ? 'success' : 'info'" size="small">
            {{ item.isOriginal ? '原创' : '转载' }}
          </el-tag>
          <el-tag v-if="!item.isPublic" type="warning" size="small">
            {{ '私有' }}
          </el-tag>
          <el-tag v-if="!item.isPublished" type="warning" size="small">
            {{ '草稿' }}
          </el-tag>
        </span>
        <a :href="`/categories/${item.category.enName}`" class="text-category">
          <span>{{ item.category.cnName }}</span>
        </a>
        <a :href="`/articles/${item._id}`">
          <h3 class="text-title">{{ item.title }}</h3>
        </a>
        <a :href="`/articles/${item._id}`">
          <p class="text-description">{{ item.description }}</p>
        </a>
        <span class="text-time" v-text="getDate(item)" />
      </div>
      <div class="card-image">
        <a :href="`/articles/${item._id}`" :style="`background-image:url(${imagePathPrefix + item.coverImage.webName})`" class="cover-image" />
      </div>
    </el-card> -->
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
      pageNum: 1,
      isLoading: false,
      pageSize: 8
    }
  },
  computed: {
    // 计算总页数
    totalPageCount () {
      let totalArticleCount = this.totalArticleCount
      return totalArticleCount % this.pageSize === 0
              ? totalArticleCount / this.pageSize
              : parseInt(totalArticleCount / this.pageSize + 1)
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
      let getArticles = app.$axios.get(`/api/articles`, { params: {pageSize:8} })
      let getPopularArticles = app.$axios.get(`/api/popularArticles`, { params: {pageSize:5} })
      let [responseA, responseB] = await Promise.all( [getArticles, getPopularArticles] )
      let { articleList, totalArticleCount, imagePathPrefix } = responseA.data
      let {popularList} = responseB.data
      store.commit("getPopularList", popularList)
      return {articleList, totalArticleCount, imagePathPrefix}

    } catch (err) {
      console.log(err)
    }
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
        this.$store.commit('mergeList', articleList)
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

<style scoped>

.card-article {
  margin-bottom: 40px;
  height:200px;
  width: 100%;
}

.card-text {
  flex: 1;
  padding: 30px 40px;
}

.card-cover {
  flex: 1;
}

.cover-image {
  display: block;
  width: 200px;
  height: 200px;
  background-position: 50% 50%;
}

.text-category {
  color: #757575;
}
.text-category:hover {
  text-decoration: underline;
}
.text-title {
  color: black;

}
.text-description, .text-time {
  color: #757575;
}
.text-tag {
  position: absolute;
  margin-top: -30px;
  margin-left: -40px;
}
.text-tag .el-tag {
  border: none;
}

.loadmore {
  text-align: center;
}
</style>
