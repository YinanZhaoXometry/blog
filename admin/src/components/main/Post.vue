<template>
  <section>
    <el-row>
      <el-input
        v-model="title"
        placeholder="请在这里输入标题"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="author"
        placeholder="请输入作者"
      />
    </el-row>

    <markdown-editor
      ref="markdownEditor"
      v-model="content"
    />
    <h4>封面和摘要</h4>
    <el-row>
      <el-col :span="12">
        <el-upload
          action="/"
          :file-list="fileList2"
          list-type="picture"
        >
          <el-button
            size="small"
            type="primary"
          >
            上传图片
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="abstract"
          type="textarea"
          :rows="3"
          placeholder="选填，如果不填写会默认抓取正文前的54个字"
          resize="none"
        />
        <!-- 加一个简介字数统计 0/120 -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          size="small"
          type="success"
          plain
        >
          保存
        </el-button>
        <el-button
          size="small"
          type="primary"
          plain
          @click="publish"
        >
          发表
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
        title: '',
        author: '',
        content: '',
        abstract: '',
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },

    methods: {
      /* 定义发布文章函数 */
      publish: async function () {
        // 依次检查：标题、作者、内容是否填写，并进行相应提示
        if(!this.title.trim())
          return this.showMessage('请输入文章标题', 'warning')
        if(!this.author.trim())
          return this.showMessage('请输入文章作者', 'warning')
        if(!this.content.trim())
          return this.showMessage('请输入文章内容', 'warning')
        // 如摘要未填写，则从正文内容截取54个字
        if(!this.abstract.trim())
          this.abstract = this.content.slice(0, 54)+'...'
        let articleObj = {
          title: this.title,
          content: this.content,
          abstract: this.abstract
        }
        // 相对应API发送ajax请求，并接收服务器响应结果
        let {data} = await this.$axios.post('/api/article', articleObj)
        let {code, msg} = data
        // 根据响应结果进行逻辑判断，并提示
        if(code > 0) {
          this.showMessage(msg, 'success')
          this.$router.push({name: 'Main'})
        } else {
          this.showMessage(msg, 'error')
        }
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
      }

    }
  }
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
</style>
