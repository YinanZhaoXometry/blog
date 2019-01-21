<template>
  <section style="display:flex">
    <div>
      <el-row>
        <nuxt-link
          v-for="item in articleList"
          :key="item._id"
          :to="'/articles/' + item._id"
        >
          <el-card shadow="hover" style="height:200px">
            <el-col :span="10">
              <span>分类1</span>
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div>
                <el-tag :type="item.isOriginal ? 'success' : 'info'">{{ item.isOriginal ? '原创' : '转载' }}</el-tag>
              </div>
              <template>
                <el-tag v-if="!item.isPublic" type="warning">
                  {{ '私有' }}
                </el-tag>
                <el-tag v-if="!item.isPublished" type="warning">
                  {{ '草稿' }}
                </el-tag>
              </template>
            </el-col>
            <el-col :span="10">
              <img
                :src="imagePathPrefix + item.coverImage.webName"
                alt="Cover image"
                style="display:block;height:200px"
              >
            </el-col>
          </el-card>
        </nuxt-link>
      </el-row>
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
    <side-section
      id="sideSection"
      style="flex:1; margin-top:20px"
    />
  </section>
</template>

<script>
import SideSection from '~/components/public/SideSection'

export default {

  components: {
    SideSection
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
      return {articleList, totalArticleCount, imagePathPrefix}
      store.commit("getPopularList", popularList)
    } catch (err) {
      console.log(err)
    }

  },

  mounted (){
    // var targetElment = document.getElementById('sideSection')
    // this.handleScrollFixed (targetElment)
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


    // handleScrollFixed (elem) {
    //   var originTop = this.getTotalTop(elem)
    //   window.addEventListener('scroll', function(){
    //     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //     if(scrollTop >= originTop) {
    //       elem.style.position = "fixed"
    //       console.log("equel!")
    //     }
    //   console.log(elem.style.position)
    //   })
    // },

    /**
     * 定义函数，用于获取elem元素与顶部之间的距离
     * elem：传入的元素
     */
    // getTotalTop (elem) {
    //   var totalTop = 0
    //   do {
    //     totalTop += elem.offsetTop
    //     elem = elem.offsetParent
    //   } while (elem)
    //   return totalTop
    // }
  },



  // SEO优化，见 https://nuxtjs.org/api/pages-head#the-head-method
  head () {
    return {
      title: '酷核 KuHe.io',
      meta: [
        { name: 'description', content: '30岁辞职学习编程，才发现只要人决定做一件事以后，多晚开始都不算晚。我将在这里分享编程学习中的一些思考和心路历程' },
        { name: 'author', content: '赵一楠' },
        { name: 'keywords', content: '编程, 自学, 转行, 学习'}
      ],
    }
  }

}


</script>

<style>



</style>
