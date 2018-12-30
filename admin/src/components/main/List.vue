<template>
  <section>
    <el-table
      style="width: 100%"
    >
      <el-table-column
        width="180"
        label="文章标题"
        prop="title"
      />
      <el-table-column
        width="180"
        label="发布日期"
        prop="time"
      />
      <el-table-column
        width="180"
        label="分类"
        prop="category"
      />
      <el-table-column
        width="180"
        label="是否公开"
        prop="public"
      />
      <el-table-column
        width="180"
        label="状态"
        prop="status"
      />
    </el-table>
  </section>
</template>

<script>
export default {
  created () {
    // 在created阶段获取数据
    this.getArticleList(1)

  },

  methods: {
    getArticleList: async function(pageNum) {
      let {data} =await this.$axios.get('/api/article', { params: {pageNum, pageSize: 6} })
      console.log(data)
    }
  }
}
</script>
