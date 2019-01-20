<template>
  <section>
    <span>嗯...! 总共写了 {{ totalArticleCount }} 篇日志，继续努力</span>
    <div
      v-for="item in articleList"
      :key="item._id"
    >
      <h1 v-if="isDisplay(item.createTime.year)">
        <nuxt-link to="/">{{ item.createTime.year + "年" }}</nuxt-link>
      </h1>
      <el-row>
        <nuxt-link to="/">
          <el-col :span="3">{{ item.createTime.simpleDate }}</el-col>
          <el-col :span="3">
            <el-tag :type="item.isOriginal ? 'success' : 'info'">
              {{ item.isOriginal ? '原创' : '转载' }}
            </el-tag>
          </el-col>
          <el-col :span="10">{{ item.title }}</el-col>
        </nuxt-link>
        <template>
          <!-- 如 isPublic=false，则显示“私有”字样 -->
          <el-tag
            v-if="!item.isPublic"
            type="warning"
          >
            {{ '私有' }}
          </el-tag>
          <!-- 如 isPublished: false，则显示“草稿”字样 -->
          <el-tag
            v-if="!item.isPublished"
            type="warning"
          >
            {{ '草稿' }}
          </el-tag>
        </template>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      displayYear: 0,
      displayDate: 0
    }
  },

  computed: {
    articleList () {
      return this.$store.state.articleList
    },
    totalArticleCount () {
      return this.$store.state.totalArticleCount
    }
  },

  methods: {
    isDisplay (year) {
      if (this.displayYear !== year) {
        this.displayYear = year
        return true
      }
      return false
    }
  }
}
</script>
