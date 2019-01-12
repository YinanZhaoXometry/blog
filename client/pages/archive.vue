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

}


</script>

<style>



</style>
