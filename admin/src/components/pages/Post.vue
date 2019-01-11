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
    <el-row>
      <el-col :span="12">
        <span>标签：</span>
        <el-tag
          v-for="tag in dynamicTags"
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
        <el-select
          v-model="category"
          placeholder="请选择文章类别"
        >
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
          v-model="isOriginal"
          placeholder="请声明原创"
        >
          <el-option
            label="原创"
            value="true"
          />
          <el-option
            label="转载"
            value="false"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <span>是否公开：</span>
        <el-select
          v-model="isPublic"
          placeholder="请设置"
        >
          <el-option
            label="公开"
            value="true"
          />
          <el-option
            label="私有"
            value="false"
          />
        </el-select>
      </el-col>
    </el-row>
    <markdown-editor
      ref="markdownEditor"
      v-model="content"
    />
    <h4>题图和摘要</h4>
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
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

        dynamicTags: [],
        tagInputVisible: false,
        tagInputValue: '',

        selectData: [],
        category: '',

        isOriginal: 'true',
        isPublic: 'true'
      }
    },

    created: async function () {
      let {data} = await this.$axios.get('/api/categories')
      this.selectData = data.result
    },

    methods: {
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
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
         if(this.abstract.length > 54)
          return this.showMessage('文章摘要过长', 'warning')
        // 如摘要未填写，则从正文内容截取54个字
        if(!this.abstract.trim())
          this.abstract = this.content.slice(0, 54)+'...'
        let obj = {
          title: this.title,
          author: this.author,
          content: this.content,
          abstract: this.abstract,
          tags: this.dynamicTags,
          category: this.category,
          isOriginal: this.isOriginal,
          isPublic: this.isPublic,
          isPublished
        }
        // 相对应API发送ajax请求，并接收服务器响应结果
        let {data} = await this.$axios.post('/api/articles', obj)
        let {success, message} = data
        // 根据响应结果进行逻辑判断，并提示
        if(success) {
          this.showMessage(message, 'success')
          this.$router.push({name: 'Main'})
        } else {
          this.showMessage(message, 'error')
        }
      },



    }
  }
</script>

<style>
  @import 'simplemde/dist/simplemde.min.css';
</style>
