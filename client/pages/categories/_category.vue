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
import SideSection from '~/components/category/SideSection'

export default {

  components: {
    MainSection,
    SideSection
  },

  async fetch ({app, params, store}) {
    let {data} = await app.$axios.get(
      `/api/categories/${params.category}`,
      {params: {pageSize: 3}}
    )
    let {success, categoryObj, cateArticleCount} = data
    if (success) {
      store.commit('getCateArticleList',{
        cateArticleCount,
        articleList: categoryObj.articles,
        category:{
          nameCN: categoryObj.nameCN,
          nameEN: categoryObj.nameEN,
          description: categoryObj.description
        }
      })
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

}


</script>

<style>



</style>
