<template>
  <section style="display:flex">
    <div style="flex:1">
      <span class="iconfont icon-pricetags">&nbsp;<b>标签：</b> </span><span>{{ tagInfo.name }}</span>
      <article-card :article-list="articleList" :image-path-prefix="imagePathPrefix" />
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
      let {data} = await app.$axios.get(`/api/tags/${encodeURI(route.params.tag)}`)
      let { articleList, tagInfo, imagePathPrefix } = data
      return { articleList, tagInfo, imagePathPrefix }
    } catch (err) {
      alert('获取文章失败，' + err)
    }
  }
}
</script>
