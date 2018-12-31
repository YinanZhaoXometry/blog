<template>
  <section>
    <el-button @click="navBack">后退</el-button>
    <el-row>
      <el-input
        :value="article.title"
        placeholder="请在这里输入标题"
        disabled
      />
    </el-row>
    <el-row>
      <el-input
        value="author"
        placeholder="请输入作者"
        disabled
      />
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>标签：</span>
        <el-tag
          v-for="tag in article.tags"
          :key="tag"
        >
          {{ tag }}
        </el-tag>
      </el-col>
      <el-col :span="12">
        <span>分类：</span>
        <el-select
          v-model="category"
          placeholder="请选择文章类别"
        >
          <el-option
            v-for="item in selectData"
            :key="item.nameEN"
            :label="item.nameCN"
            :value="item._id"
          />
        </el-select>
      </el-col>
    </el-row>
    <markdown-editor
      ref="markdownEditor"
      v-model="article.content"
    />
    <h4>题图和摘要</h4>
    <el-row>
      <el-col :span="12">
        <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/300x300/format/webp/quality/100">
      </el-col>
      <el-col :span="12">
        <el-input
          :value="article.abstract"
          type="textarea"
          :rows="3"
          placeholder="选填，如果不填写会默认抓取正文前的54个字"
          resize="none"
          disabled
        />
        <!-- 加一个简介字数统计 0/120 -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          size="small"
          plain
          @click="cancelEdit"
        >
          取消
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="saveArticle"
        >
          保存
        </el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

  export default {
    components: {
      markdownEditor
    },

    data () {
      return {
        article: {},

        selectData: [],
        category: ''
      }
    },

    // 在created生命周期获取文章数据
    created: async function () {
      let id = this.$route.params.id
      let getArticleData = this.$axios.get(`/api/article/${id}`)
      let getCategoryData = this.$axios.get('/api/categories')
      let [articleResponse, categoryResponse] = await Promise.all([getArticleData, getCategoryData])
      this.article = articleResponse.data.article
      this.category = this.article.category
      this.selectData = categoryResponse.data.result
    },

    methods: {
      /* 定义保存文章函数 */
      saveArticle: async function () {
        if(!this.article.content.trim())
          return this.showMessage('请输入文章内容', 'warning')
        // 如摘要未填写，则从正文内容截取54个字
        let articleObj = {
          id: this.article._id,
          content: this.article.content,
          category: this.category
        }
        // 相对应API发送ajax请求，并接收服务器响应结果
        let {data} = await this.$axios.patch('/api/article', articleObj)
        let {message, success} = data
        // 根据响应结果进行逻辑判断，并提示
        if(success) {
          this.showMessage(message, 'success')
          this.$router.back()
        } else {
          this.showMessage(message, 'error')
        }
      },

      cancelEdit () {
        this.$router.back()
      },

      /* 定义elementUi消息提示函数 */
      showMessage (msg, type) {
        this.$message({
          message: msg,
          type: type,
          center: true,
          showClose: true,
          duration: 1500
        })
      },

      // 定义后退方法
      navBack () {
        this.$router.back()
      }

    }
  }
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
</style>
