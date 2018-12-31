<template>
  <section>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="nameCN"
        label="分类名称"
      />
      <el-table-column
        prop="nameEN"
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
            @click="dialogFormVisible = true"
          >
            + 增加分类
          </el-button>
        </template>
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
    <el-dialog
      title="添加文章分类"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form :model="form">
        <el-form-item
          label="中文名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.nameCN"
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
            v-model="form.nameEN"
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
          @click="addCategory"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
          /* eslint-disable */

export default {
  data () {
    return {
      tableData: [],

      dialogFormVisible: false,
      formLabelWidth: '70px',
      form: {}
    }
  },
  created: async function () {
    let {data} = await this.$axios.get('/api/categories')
    this.tableData = data.result
  },

  methods: {
    //在弹出的添加文章分类对话框，点击确定后的处理函数
    addCategory: async function () {
      let {data} = await this.$axios.post('/api/categories', this.form)
      let {success, message} = data
      if (success)
        var msgType = 'success'
      else
        var msgType = 'error'
      this.$message({
          type: msgType,
          message: message
        })
      this.form = {}
      this.dialogFormVisible = false
    },

    //在弹出的添加文章分类对话框，点击取消后的处理函数
    handleCancel () {
      this.form = {}
      this.dialogFormVisible = false
    },
  }
}
</script>
