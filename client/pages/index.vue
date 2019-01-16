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
import SideSection from '~/components/public/SideSection'

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
    try {
      let getArticles = app.$axios.get(`/api/articles`, { params: {pageSize:8} })
      let getPopularArticles = app.$axios.get(`/api/popularArticles`, { params: {pageSize:5} })
      let [responseA, responseB] = await Promise.all( [getArticles, getPopularArticles] )
      let {articleList, totalArticleCount} = responseA.data
      let {popularList} = responseB.data
      store.commit("getArticleList", {articleList, totalArticleCount})
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
