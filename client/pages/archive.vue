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
import MainSection from '~/components/archive/MainSection'
import SideSection from '~/components/public/SideSection'

export default {

  components: {
    MainSection,
    SideSection
  },

  async fetch ({app, store}) {
    try {
      let {data} = await app.$axios.get('/api/articles')
      let {articleList, totalArticleCount} = data
      store.commit('getArticleList', {articleList, totalArticleCount})
    } catch (err) {
      this.$message.error(err)
    }
  },

  head () {
    return {
      title: '归档 | 酷核',
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
