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
import MainSection from '~/components/home/MainSection'
import SideSection from '~/components/home/SideSection'

export default {

  components: {
    MainSection,
    SideSection
  },

  data () {
    return {
      pageNum: 1
    }
  },

  computed: {

  },

  // 向文章 api 请求数据，将获取到的数据保存至 store 中
  async fetch ({ app, store }) {
    let getArticles = app.$axios.get(`/api/article`, { params: {pageSize:8} })
    let getPopularArticles = app.$axios.get(`/api/popularArticle`, { params: {pageSize:5} })
    let [responseA, responseB] = await Promise.all( [getArticles, getPopularArticles] )
    let {articleList, totalArticleCount} = responseA.data
    let {popularList} = responseB.data
    store.commit("getArticleList", {articleList, totalArticleCount})
    store.commit("getPopularList", popularList)

  },

  mounted (){
    // var targetElment = document.getElementById('sideSection')
    // this.handleScrollFixed (targetElment)
  },

  methods:{
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

}


</script>

<style>



</style>
