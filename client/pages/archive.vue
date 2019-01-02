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
import SideSection from '~/components/archive/SideSection'

export default {

  components: {
    MainSection,
    SideSection
  },

  async fetch ({app, store}) {
    let {data} = await app.$axios.get('/api/article')
    let {success, articleList, totalArticleCount} = data
    if (success)
      store.commit('getArticleList', {articleList, totalArticleCount})
  },

  methods:{

  },

}


</script>

<style>



</style>
