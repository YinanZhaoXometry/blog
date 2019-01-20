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
          closable
          :disable-transitions="true"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="tagInputVisible"
          ref="saveTagInput"
          v-model="tagInputValue"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >
          + New Tag
        </el-button>
      </el-col>
      <el-col :span="12">
        <span>分类：</span>
        <el-select v-model="categoryId" placeholder="请选择文章类别">
          <el-option
            v-for="item in selectData"
            :key="item.enName"
            :label="item.cnName"
            :value="item._id"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>原创声明：</span>
        <el-select
          v-model="article.isOriginal"
          placeholder="请声明原创"
          disabled
        >
          <el-option label="原创" :value="true" />
          <el-option label="转载" :value="false" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <span>是否公开：</span>
        <el-select v-model="article.isPublic" placeholder="请设置">
          <el-option label="公开" :value="true" />
          <el-option label="私有" :value="false" />
        </el-select>
      </el-col>
    </el-row>
    <!-- Markdown编辑器区域 -->
    <markdown-editor
      ref="markdownEditor"
      v-model="article.rawContent"
      :configs="mdeConfigs"
      :highlight="true"
      style="text-align:justify"
      class="theme"
      preview-class="markdown-body"
    />
    <h4>封面和摘要</h4>
    <el-row>
      <el-col :span="12">
        <img :src="imagePathPrefix + article.coverImage.webName">
      </el-col>
      <el-col :span="12">
        <el-input
          :value="article.description"
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
          @click="saveUpdate"
        >
          保存
        </el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js'
window.hljs = hljs

export default {
  components: {
    markdownEditor
  },

  data () {
    return {
      article: {},
      categoryId: '',
      selectData: [],
      tagInputVisible: false,
      tagInputValue: '',
      imagePathPrefix: '',

      // Markdown编辑器设置选项
      mdeConfigs: {
        spellChecker: false,
        autosave: {
          enabled: true,
          uniqueId: 'mde-for-edit-blog-content',
        },
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      }
    }
  },

  // 在created生命周期获取文章数据
  created: async function () {
    try {
      let id = this.$route.params.id
      let getArticleData = this.$axios.get(`/api/articles/${id}`)
      let getCategoryData = this.$axios.get('/api/categories')
      let [articleResponse, categoryResponse] = await Promise.all([getArticleData, getCategoryData])
      this.article = articleResponse.data.article
      this.imagePathPrefix = articleResponse.data.imagePathPrefix
      this.categoryId = this.article.category._id
      this.selectData = categoryResponse.data.result
    } catch (err) {
      this.$message.error(err)
    }
  },

  methods: {
    /* 定义保存文章函数 */
    async saveUpdate () {
      if(!this.article.rawContent.trim())
        return this.showMessage('请输入文章内容', 'warning')
      if(!this.article.category)
        return this.showMessage('请选择文章类别', 'warning')
      let simplemde = this.$refs.markdownEditor.simplemde
      let htmlContent = simplemde.markdown(this.article.rawContent)
      let articleObj = {
        id: this.article._id,
        rawContent: this.article.rawContent,
        htmlContent,
        category: this.categoryId,
        tags: this.article.tags,
        isPublic: this.article.isPublic,
      }

      // 相对应API发送ajax请求，并接收服务器响应结果
      try {
        let {data} = await this.$axios.patch('/api/articles', articleObj)
        let {message} = data
        // 根据响应结果进行逻辑判断，并提示
        this.showMessage(message, 'success')
        this.$router.back()
      } catch (err) {
        this.showMessage(err)
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

    /* 定义后退方法 */
    navBack () {
      this.$router.back()
    },

    /* 定义标签添加、删除方法 */
    showInput () {
      this.tagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let tagInputValue = this.tagInputValue;
      if (tagInputValue) {
        this.article.tags.push(tagInputValue);
      }
      this.tagInputVisible = false;
      this.tagInputValue = '';
    },
    handleClose (tag) {
      this.article.tags.splice(this.article.tags.indexOf(tag), 1);
    },

  }
}
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
  @import 'github-markdown-css';
  @import 'highlight.js/styles/atom-one-dark.css';

  /*修改代码块背景色及字体颜色*/
  .theme .editor-preview-side pre, .theme .editor-preview pre{
    color: #abb2bf !important;
    background: #282c34 !important;
  }
</style>
