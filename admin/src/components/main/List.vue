<template>
  <section>
    <el-table
      style="width: 100%"
      :data="tableData"
    >
      <el-table-column
        width="180"
        label="文章标题"
        prop="title"
      />
      <el-table-column
        width="180"
        label="发布日期"
        prop="time.ms"
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
      <el-table-column
        width="180"
        label="操作"
        prop="operation"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :total="totalArticleCount"
      :current-page="1"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="prev, pager, next, sizes, total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      totalArticleCount: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created () {
    // 在created阶段获取数据
    this.loadPage(this.currentPage, this.pageSize)
  },

  methods: {
    // 定义加载页面(文章列表)函数
    loadPage: async function(pageNum, pageSize) {
      let {data} =await this.$axios.get('/api/articles', { params: {pageNum, pageSize} })
      let {articleList, totalArticleCount} = data
      this.tableData = articleList
      this.totalArticleCount = totalArticleCount
    },

    handlePageSizeChange (pageSize) {
      this.loadPage(this.currentPage, pageSize)
      this.pageSize = pageSize
    },

    handleCurrentChange (currentPage) {
      this.loadPage(currentPage, this.pageSize)
      this.currentPage = currentPage
    },

    handleEdit (index, row) {
      this.$router.push({path: `edit/${row._id}`})
    },

    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        await this.$axios.delete(`/api/articles/${row._id}`)
        this.loadPage(this.currentPage, this.pageSize)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
