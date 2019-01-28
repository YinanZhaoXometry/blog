<template>
  <section style="display:flex; flex-direction:column">
    <span>嗯...! 目前总共写了 {{ totalArticleCount }} 篇日志，继续努力：</span>
    <div v-for="(item,index) in articleList" :key="item._id">
      <h1 v-if="calc(item ,index, articleList)">
        {{ item.createTime.year + "年" }}
      </h1>
      <el-row class="article-row">
        <el-col :span="3">{{ item.createTime.simpleDate }}</el-col>
        <el-col :span="3">
          <el-tag :type="item.isOriginal ? 'success' : 'info'" class="article-tag" size="small">
            {{ item.isOriginal ? '原创' : '转载' }}
          </el-tag>
        </el-col>
        <el-col :span="8">
          <nuxt-link to="`/articles/${item._id}`" class="hover-underline">
            {{ item.title }}
          </nuxt-link>
        </el-col>
        <el-col :span="5">
          <span>发表在</span>
          <nuxt-link to="`/categories/${item.cateogry.enName}`" class="hover-underline">
            <span>{{ item.category.cnName }}</span>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    calc (item, index, articleList) {
      if (index>0 && index<= articleList.length-1){
        let prevItem = articleList[index-1]
        let result = prevItem.createTime.year !== item.createTime.year
        return result
      } return true
    },
  },

  async asyncData ({app, store}) {
    try {
      let {data} = await app.$axios.get('/api/articles')
      let {articleList, totalArticleCount} = data
      return {articleList, totalArticleCount}
    } catch (err) {
      console.log(err)
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

<style scoped>
.article-row {
  padding: 20px 15px 2px;
  border-bottom: 1px dashed #999
}

.article-tag {
  margin-top: -10px;
}

</style>
