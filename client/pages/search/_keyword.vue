<template>
  <section style="display:flex">
    <div style="flex:1">
      <b><span class="iconfont icon-search">&nbsp;关键字：{{ $route.params.keyword }}</span></b>
      <article-card :article-list="articles" :image-path-prefix="imagePathPrefix" />
    </div>
  </section>
</template>

<script>
import ArticleCard from '~/components/public/ArticleCard.vue'

export default {
  components: {
    ArticleCard
  },
  async asyncData ({ app, route }) {
    try {
      let {data} = await app.$axios.get(
        '/api/search',
        {params: {keyword: route.params.keyword}}
      )
      console.log(data)
      let {articles, imagePathPrefix} = data
      return {articles, imagePathPrefix}
    } catch (err) {
      this.$message.error(err)
    }
  }

}
</script>
