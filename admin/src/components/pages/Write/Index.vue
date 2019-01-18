<template>
  <section>
    <el-row>
      <el-input v-model="title" placeholder="请在这里输入标题" />
    </el-row>
    <el-row>
      <el-input v-model="author" placeholder="请输入作者" />
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>标签：</span>
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="true"
          @close="handleTagDelete(tag)"
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
    <markdown-editor ref="markdownEditor" v-model="content" />
    <h4>封面和摘要</h4>
    <el-row>
      <!-- 上传封面区域 -->
      <el-col :span="12">
        <el-button type="text" @click="isDialogShow=true">
          <img v-if="imageUrl" :src="imageUrl" alt="titleImage">
          <i v-else class="el-icon-plus">
            <p>选择封面</p>
          </i>
        </el-button>
        <!-- <el-upload
          action="/"
          :show-file-list="false"
          :on-success="handleSuccessUpload"
          :before-upload="beforeUpload"
        >
          这是上传组件按钮
        </el-upload> -->
      </el-col>
      <!-- 封面选择对话框 -->
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
        <!-- 加一个简介字数统计 0/120 -->
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
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import MyDialog from './Dialog.vue'
export default {
  components: {
    markdownEditor,
    MyDialog
  },

  data () {
    return {
      title: '',
      author: '',
      content: '',
      description: '',
      dynamicTags: [],
      tagInputVisible: false,
      tagInputValue: '',
      selectData: [],
      category: '',
      isOriginal: true,
      isPublic: true,

      // 对话框相关参数
      imageUrl:'',
      imageId: '',
      isDialogShow: false,
    }
  },

  created: async function () {
    try {
      let {data} = await this.$axios.get('/api/categories')
      this.selectData = data.result
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
        this.dynamicTags.push(tagInputValue);
      }
      this.tagInputVisible = false;
      this.tagInputValue = '';
    },
    handleTagDelete (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    /* 定义选择封面对话框完成时的处理函数 */
    handleDialogSuccess (imageData) {
      this.imageUrl = imageData.imagePathPrefix + imageData.imageDoc.webName
      this.imageId = imageData.imageDoc._id
    },

    /* 定义发布文章函数 */
    publish: async function (isPublished) {
      // 依次检查：标题、作者、内容是否填写，并进行相应提示
      if(!this.title.trim())
        return this.showMessage('请输入文章标题', 'warning')
      if(!this.author.trim())
        return this.showMessage('请输入文章作者', 'warning')
      if(!this.content.trim())
        return this.showMessage('请输入文章内容', 'warning')
      if(!this.category)
        return this.showMessage('请选择文章类别', 'warning')
        if(this.description.length > 54)
        return this.showMessage('文章摘要过长', 'warning')
      // 如摘要未填写，则从正文内容截取54个字
      if(!this.description.trim())
        this.description = this.content.slice(0, 54)+'...'
      let obj = {
        title: this.title,
        author: this.author,
        content: this.content,
        description: this.description,
        tags: this.dynamicTags,
        category: this.category,
        isOriginal: this.isOriginal,
        isPublic: this.isPublic,
        isPublished
      }
      // 相对应API发送ajax请求，并接收服务器响应结果
      try {
        let {data} = await this.$axios.post('/api/articles', obj)
        let {message} = data
        // 根据响应结果进行逻辑判断，并提示
        this.showMessage(message, 'success')
        this.$router.push({name: 'Main'})
      } catch (err) {
        this.showMessage(err)
      }
    },

  }
}
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
</style>
