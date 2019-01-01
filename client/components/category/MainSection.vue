<template>
  <section>
    <el-row>
      <span>分类：{{ category.nameCN }}</span>
    </el-row>
    <el-row>
      <nuxt-link
        v-for="item in cateArticleList"
        :key="item._id"
        :to="{path: `/article/${item._id}`}"
      >
        <el-card
          shadow="hover"
          style="height:200px"
        >
          <el-col :span="10">
            <h2>{{ item.title }}</h2>
            <div>
              <span><i class="el-icon-date" /> &nbsp; {{ timeTranslate(item.time.toMs) }}</span>
            </div>
            <p>{{ item.abstract }}</p>
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
import timeTranslate from '../../utils/timeTranslate'
export default {
  data () {
    return {
      isLoading: false,
      pageNum: 1,
      pageSize: 3
    }
  },

  computed: {
    cateArticleList () {
      return this.$store.state.cateArticleList
    },
    category () {
      return this.$store.state.category
    },
    // 计算总页数
    totalPageCount () {
      let cateArticleCount = this.$store.state.cateArticleCount
      return cateArticleCount % this.pageSize === 0
        ? cateArticleCount / this.pageSize
        : parseInt(cateArticleCount / this.pageSize + 1)
    },
    // 判断是否为最后一页
    isLastPage () {
      return this.pageNum === this.totalPageCount
    }
  },

  methods: {
    loadMore: async function () {
      this.isLoading = true
      if (this.pageNum < this.totalPageCount) {
        this.pageNum++
        let {data} = await this.$axios.get(
          `/api/categories/${this.category.nameEN}`,
          { params: {pageNum: this.pageNum, pageSize: this.pageSize} }
        )
        let {success, categoryObj} = data
        if (success) {
          this.$store.commit('mergeCateArticleList', categoryObj)
          this.isLoading = false
        }
      }
    },

    timeTranslate: timeTranslate
  }
}
</script>
