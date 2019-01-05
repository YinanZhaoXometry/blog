<template>
  <section>
    123123{{ $store.state.totalArticleCount }}
    <el-row>
      <nuxt-link
        v-for="item in articleList"
        :key="item._id"
        :to="{path: `/articles/${item._id}`}"
      >
        <el-card
          shadow="hover"
          style="height:200px"
        >
          <el-col :span="10">
            <span>分类1</span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.abstract }}</p>
            <div>
              <el-tag :type="item.isOriginal ? 'success' : 'info'">{{ item.isOriginal ? '原创' : '转载' }}</el-tag>
              <!-- <span><i class="el-icon-date" /> &nbsp; {{ item.createTime.year === new Date().getFullYear() ? item.createTime.simpleDate : item.createTime.fullDate }}</span> -->
            </div>
            <template>
              <!-- 为 “私有(isPublic: false)” 文章，显示“私有”字样 -->
              <el-tag
                v-if="!item.isPublic"
                type="warning"
              >
                {{ '私有' }}
              </el-tag>
              <!-- 为 “草稿(isPublished: false)” 文章，显示“草稿”字样 -->
              <el-tag
                v-if="!item.isPublished"
                type="warning"
              >
                {{ '草稿' }}
              </el-tag>
            </template>
          </el-col>
          <el-col :span="10">
            <img
              src="~/assets/1540478160349.png"
              alt=""
              style="display:block;height:200px"
            >
          </el-col>
        </el-card>
      </nuxt-link>
    </el-row>
    <el-button
      v-if="isLoading"
      size="small"
      :loading="true"
    >
      加载中
    </el-button>
    <el-button
      v-else
      v-show="!isLastPage"
      type="primary"
      plain
      size="small"
      @click="loadMore"
    >
      加载更多
    </el-button>
    <p v-show="isLastPage">---没有更多文章了---</p>
  </section>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      pageNum: 1,
      pageSize: 8
    }
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    },
    // 计算总页数
    totalPageCount () {
      let totalArticleCount = this.$store.state.totalArticleCount
      return totalArticleCount % this.pageSize === 0
        ? totalArticleCount / this.pageSize
        : parseInt(totalArticleCount / this.pageSize + 1)
    },
    // 判断是否为最后一页
    isLastPage () {
      return this.pageNum === this.totalPageCount
    },
    // 计算发表日期显示格式，如文章发表年份为今年，则不显示年份

  },
  methods: {
    loadMore: async function () {
      this.isLoading = true
      if (this.pageNum < this.totalPageCount) {
        this.pageNum++
        let {data} = await this.$axios.get(
          `/api/articles`,
          { params: {pageNum: this.pageNum, pageSize: this.pageSize} }
        )
        let {articleList} = data
        this.$store.commit('mergeList', articleList)
      }
      this.isLoading = false
    },
  }
};
</script>
