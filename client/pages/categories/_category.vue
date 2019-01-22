<template>
  <section>
    <!-- <el-row>
      <nuxt-link
        v-for="item in cateArticleList"
        :key="item._id"
        :to="{path: `/articles/${item._id}`}"
      >
        <el-card shadow="hover" style="height:200px">
          <el-col :span="10">
            <span>分类1</span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div>
              <el-tag :type="item.isOriginal ? 'success' : 'info'">{{ item.isOriginal ? '原创' : '转载' }}</el-tag>
              <span><i class="el-icon-date" /> &nbsp; {{ item.createTime.year === new Date().getFullYear() ? item.createTime.simpleDate : item.createTime.fullDate }}</span>
            </div>
            <template>
              为 “私有(isPublic: false)” 文章，显示“私有”字样
              <el-tag v-if="!item.isPublic" type="warning">
                {{ '私有' }}
              </el-tag>
              为 “草稿(isPublished: false)” 文章，显示“草稿”字样
              <el-tag v-if="!item.isPublished" type="warning">
                {{ '草稿' }}
              </el-tag>
            </template>
          </el-col>
          <el-col :span="10">
            <img
              src="~/assets/1540478160349.png"
              alt="封面图片"
              style="display:block;height:200px"
            >
          </el-col>
        </el-card>
      </nuxt-link>
    </el-row> -->
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
    // cateArticleList () {
    //   return this.$store.state.cateArticleList
    // },

    // category () {
    //   return this.$store.state.category
    // },
    // 计算总页数
    totalPageCount () {
      // let cateArticleCount = this.$store.state.cateArticleCount
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
      // store.commit('getCateArticleList',{
      //   cateArticleCount,
      //   articleList: categoryObj.articles,
      //   category:{
      //     cnName: categoryObj.cnName,
      //     enName: categoryObj.enName,
      //     description: categoryObj.description
      //   }
      // })
      // store.commit('setImagePrefix', imagePathPrefix)
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
          // this.$store.commit('mergeCateArticleList', categoryObj)
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

<style>

.loadmore {
  text-align: center;
}

</style>
