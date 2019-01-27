<template>
  <section>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="cnName"
        label="分类名称"
      />
      <el-table-column
        prop="enName"
        label="分类名称"
      />
      <el-table-column
        prop="description"
        label="说明"
      />
      <el-table-column
        prop="operation"
      >
        <template
          slot="header"
          slot-scope="scope"
        >
          <el-button
            type="text"
            @click="handleAdd"
          >
            + 增加分类
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isDialogShow"
      center
    >
      <el-form :model="form">
        <el-form-item
          label="中文名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.cnName"
            autocomplete="off"
            autofocus="true"
            placeholder="请输入中文"
          />
        </el-form-item>
        <el-form-item
          label="英文名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.enName"
            autocomplete="off"
            placeholder="请输入英文，空格用“-”代替"
          />
        </el-form-item>
        <el-form-item
          label="说明"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            resize="none"
            autocomplete="off"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <!-- 删除确认框 -->
  </section>
</template>

<script>
          /* eslint-disable */

export default {
  data () {
    return {
      tableData: [],
      isDialogShow: false,
      dialogTitle: '',
      requestUrl: '',
      isGET: null,
      formLabelWidth: '70px',
      form: {
        enName: '',
        cnName: '',
        description: '',
      }
    }
  },
  async created () {
    try {
      let {data} = await this.$axios.get('/api/categories')
      this.tableData = data.result
    } catch (err) {
      this.$message.error(err)
    }
  },

  methods: {
    // 在弹出对话框中，点击确定后的处理函数
    async handleConfirm () {
      try {
        console.log(this.requestUrl)
        let {data} =
          this.isGET
          ? await this.$axios.post(this.requestUrl, this.form)
          : await this.$axios.patch(this.requestUrl, this.form)
        let {message} = data
        this.$message.success(message)
        window.setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (err) {
        this.$message.error(err.toString())
      }
      this.form = {}
      this.isDialogShow = false
    },

    //在弹出的添加文章分类对话框，点击取消后的处理函数
    handleCancel () {
      this.form = {}
      this.isDialogShow = false
    },

    handleAdd () {
      this.dialogTitle = '增加文章分类'
      this.isDialogShow = true
      this.requestUrl = '/api/categories'
      this.isGET = true
    },
    handleEdit (category) {
      this.dialogTitle = '修改文章分类'
      let { cnName, enName, description } = category
      this.form = { cnName, enName, description }
      this.isDialogShow =true
      this.requestUrl = `/api/categories/${category._id}`
      this.isGET = false

    },
    handleDelete (category) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(
        async () => {
        await this.$axios.delete(`/api/categories/${category._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        window.setTimeout(() => {
          window.location.reload()
        }, 1000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
