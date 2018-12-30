<template>
  <section>
    <el-row>
      <nuxt-link
        v-for="item in articleList"
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
              <span><i class="el-icon-date" /> &nbsp; {{ postTime(item.time.ms) }}</span>
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
import {serverUrl} from '../../config/serverUrl'

export default {
  props: {

  },
  data () {
    return {
      isLoading: false,
      pageNum: 1,
    }
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    },
    // 计算总页数
    totalPageCount () {
      let totalArticleCount = this.$store.state.totalArticleCount
      if (totalArticleCount % 8 === 0)
        return totalArticleCount/8
      else
        return parseInt(totalArticleCount/8+1)
    },
    // 判断是否为最后一页
    isLastPage () {
      return this.pageNum === this.totalPageCount
    }

  },
  methods: {
    postTime (ms) {
      var date = new Date(ms)
      var postYear = date.getFullYear()
      var currentYear = new Date().getFullYear()
      if (postYear === currentYear) {
        return (date.getMonth()+1)+"月"+date.getDate()+"日"
      }
      else return postYear+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"
    },

    loadMore: async function () {
      this.isLoading = true
      if (this.pageNum < this.totalPageCount) {
        this.pageNum++
        let {data} = await this.$axios.get(
          `${serverUrl}/api/article`,
          { params: {pageNum: this.pageNum, pageSize: 8} }
        )
        let {articleList} = data
        this.$store.commit('mergeList', articleList)
      }
      this.isLoading = false
    }
  }
};
</script>
