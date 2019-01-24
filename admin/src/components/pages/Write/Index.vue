<template>
  <section>
    <el-row>
      <el-input v-model="title" placeholder="请在这里输入标题" />
    </el-row>
    <el-row>
      <el-input v-model="author" placeholder="请输入作者" />
    </el-row>
    <el-row>
      <!-- 添加标签 -->
      <el-col :span="12">
        <span>标签：</span>
        <el-select
          ref="myselect"
          v-model="selectedTags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
          :multiple-limit="3"
        >
          <el-option
            v-for="item in totalTagList"
            :key="item._id"
            :value="item.name"
          />
        </el-select>
      </el-col>
      <!-- 选择分类 -->
      <el-col :span="12">
        <span>分类：</span>
        <el-select v-model="category" placeholder="请选择文章类别">
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
        <el-select v-model="isOriginal" placeholder="请声明原创">
          <el-option label="原创" :value="true" />
          <el-option label="转载" :value="false" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <span>是否公开：</span>
        <el-select v-model="isPublic" placeholder="请设置">
          <el-option label="公开" :value="true" />
          <el-option label="私有" :value="false" />
        </el-select>
      </el-col>
    </el-row>
    <!-- Markdown编辑器区域 -->
    <markdown-editor
      ref="markdownEditor"
      v-model="rawContent"
      :configs="mdeConfigs"
      :highlight="true"
      style="text-align:justify"
      class="theme"
      preview-class="markdown-body"
    />
    <h4>封面和摘要</h4>
    <el-row>
      <!-- 选择封面区域 -->
      <el-col :span="12">
        <el-button type="text" @click="isDialogShow=true">
          <img v-if="imageUrl" :src="imageUrl" alt="titleImage">
          <i v-else class="el-icon-plus">
            <p>选择封面</p>
          </i>
        </el-button>
      </el-col>
      <my-dialog
        :is-dialog-show="isDialogShow"
        @close="isDialogShow = false"
        @success="handleDialogSuccess"
      />
      <!-- 摘要区域 -->
      <el-col :span="12">
        <el-input
          v-model="description"
          type="textarea"
          :rows="3"
          placeholder="选填，如果不填写会默认抓取正文前的54个字"
          resize="none"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          size="small"
          type="success"
          plain
          @click="publish(false)"
        >
          保存
        </el-button>
        <el-button
          size="small"
          type="primary"
          plain
          @click="publish(true)"
        >
          发表
        </el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import MarkdownEditor from 'vue-simplemde/src/markdown-editor'
import MyDialog from './Dialog.vue'
import hljs from 'highlight.js'
window.hljs = hljs

export default {
  components: {
    MarkdownEditor,
    MyDialog
  },

  data () {
    return {
      title: '',
      author: '',
      rawContent: '',
      description: '',
      tagInputVisible: false,
      tagInputValue: '',
      selectData: [],
      category: '',
      isOriginal: true,
      isPublic: true,

      // 标签相关
      totalTagList: [],
      selectedTags: [],

      // 对话框相关参数
      imageUrl:'',
      imageId: '',
      isDialogShow: false,

      // Markdown编辑器设置选项
      mdeConfigs: {
        spellChecker: false,
        // autosave: {
        //   enabled: true,
        //   uniqueId: 'mde-for-new-blog-content',
        // },
        placeholder: '从这里开始写正文',
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      }
    }
  },

  async created () {
    try {
      let {data} = await this.$axios.get('/api/categories')
      this.selectData = data.result

      let tagResponse = await this.$axios.get('/api/tags')
      this.totalTagList = tagResponse.data.totalTagList

    } catch (err) {
      this.$message.error(err)
    }
  },

  methods: {
    /* 定义elementUi消息提示函数 */
    showMessage (msg, type) {
      this.$message({
        message: msg,
        type: type,
        center: true,
        showClose: true,
        duration: 1500,
      })
    },

     /* 定义选择封面对话框完成时的处理函数 */
    handleDialogSuccess (imageData) {
      this.imageUrl = imageData.imagePathPrefix + imageData.imageDoc.webName
      this.imageId = imageData.imageDoc._id
    },

    /* 定义发布文章函数 */
    async publish (isPublished) {
      // 输入内容检查，并提示
      if(!this.title.trim())
        return this.showMessage('请输入文章标题', 'warning')
      if(!this.author.trim())
        return this.showMessage('请输入文章作者', 'warning')
      if(!this.rawContent.trim())
        return this.showMessage('请输入文章内容', 'warning')
      if(!this.category)
        return this.showMessage('请选择文章类别', 'warning')
      if(this.description.length > 54)
        return this.showMessage('文章摘要过长', 'warning')
      if(!this.imageId)
        return this.showMessage('请选择封面图片', 'warning')
      // 如摘要未填写，则从正文内容截取54个字
      if(!this.description.trim())
        this.description = this.rawContent.slice(0, 54)+'...'

      //将新标签保存至数据库，然后获取所有标签的id
      var totalTagNameList = this.totalTagList.map(
        item => item = item.name
       )
      var newTagNameList = this.selectedTags.filter(
        item => !totalTagNameList.includes(item)
      )
      if (newTagNameList.length === 0) {
        var tagIdList = this.totalTagList
          .filter( item => this.selectedTags.includes(item.name) )
          .map( item => item._id )
      } else {
        await this.$axios.post( '/api/tags', {newTagNameList} )
        let {data} = await this.$axios.get( 'api/tags' )
        let {totalTagList} = data
        var tagIdList = totalTagList
          .filter( item => this.selectedTags.includes(item.name) )
          .map( item => item._id )
      }
      // 将文章内容转换成html格式
      let simplemde = this.$refs.markdownEditor.simplemde
      let htmlContent = simplemde.markdown(this.rawContent)
      // 构造文章对象，方便保存
      let obj = {
        title: this.title,
        author: this.author,
        description: this.description,
        rawContent: this.rawContent,
        htmlContent,
        category: this.category,
        tags: tagIdList,
        coverImage: this.imageId,
        isPublic: this.isPublic,
        isPublished,
        isOriginal: this.isOriginal,
      }

      // 发表文章
      try {
        let {data} = await this.$axios.post('/api/articles', obj)
        let {message} = data
        // 根据响应结果进行逻辑判断，并提示
        this.showMessage(message, 'success')
        this.$router.push({name: 'Index'})
        // 清零
        this.newTagList = []
      } catch (err) {
        this.showMessage(err)
      }
    },

  }
}
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
  @import 'github-markdown-css';
  @import 'highlight.js/styles/atom-one-dark.css';

  /*修改代码块背景色及字体颜色*/
  /* .theme .editor-preview-side pre, .theme .editor-preview pre{
    color: #abb2bf !important;
    background: #282c34 !important;
  } */
</style>
