<template>
  <section style="display:flex">
    <main-section
      style="flex:1"
    />
    <side-section
      id="sideSection"
      style="flex:1; margin-top:20px"
    />
  </section>
</template>

<script>
import MainSection from '~/components/category/MainSection'
import SideSection from '~/components/public/SideSection'

export default {

  components: {
    MainSection,
    SideSection
  },

  async fetch ({app, params, store}) {
    try {
      let {data} = await app.$axios.get(
        `/api/categories/${params.category}`,
        {params: {pageSize: 3}}
      )
      let {categoryObj, cateArticleCount} = data
      store.commit('getCateArticleList',{
        cateArticleCount,
        articleList: categoryObj.articles,
        category:{
          cnName: categoryObj.cnName,
          enName: categoryObj.enName,
          description: categoryObj.description
        }
      })
    } catch (err) {
      this.$message.error(err)
    }

  },


  // 向文章 api 请求数据，将获取到的数据保存至 store 中
  // async fetch ({ app, store }) {
  //   // 获取主要区域文章数据
  //   // let responseArticle = await app.$axios.get(`/api/categories/${}`, { params: {pageSize:6} })
  //   let {articleList, totalArticleCount} = responseArticle.data
  //   store.commit("getArticleList", {articleList, totalArticleCount})
  //   // 获取侧边栏热门文章数据（如vuex中有数据则不获取）
  //   let popularArticleList = store.state.popularList
  //   if (popularArticleList.length === 0) {
  //     let responsePopularArt = await app.$axios.get(`/api/popularArticle`, { params: {pageSize:5} })
  //     let {popularList} = responsePopularArt.data
  //     store.commit("getPopularList", popularList)
  //   }
  // },

  methods:{

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



</style>
