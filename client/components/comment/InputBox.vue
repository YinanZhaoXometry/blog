<template>
  <section>
    <transition name="fade-wrapper">
      <div v-show="status.isShow">
        <!-- <el-input
          v-model="status.inputValue"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
          @focus="onInputFocus"
        /> -->
        <el-input
          v-model="inputValue"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
          @focus="onInputFocus"
        />
        <transition name="fade">
          <div v-show="status.isButtonsShow">
            <el-row type="flex">
              <el-col :span="6"><el-input v-model="commentName" placeholder="称呼 *" /></el-col>
              <el-col :span="6"><el-input v-model="commentEmail" placeholder="邮箱 *" /></el-col>
              <el-col :span="8">
                <el-input v-model="commentSite" placeholder="个人网址">
                  <el-select slot="prepend" v-model="commentSitePrefix" placeholder="请选择">
                    <el-option label="http://" value="http://" />
                    <el-option label="https://" value="https://" />
                  </el-select>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              </el-col>
            </el-row>
            <span @click="onCancel">取消</span>
            <el-button type="success" round @click="onSubmit">发送</el-button>
          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    status: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      commentSitePrefix: 'http://',
      commentSite: '',
      commentName: '',
      commentEmail: '',
      rememberMe: false,
      inputValue: '',

    }
  },

  computed: {
    comment () {
      return this.$store.state.comments.commentList[this.status.index]
    },
    // subComment () {
    //   if(this.subIndex === -1) return {}
    //   else return this.comment.subComments[this.status.subIndex]
    // },

  },

  watch: {
    'status.defaultInput': function (newValue, oldValue) {
      this.inputValue = newValue
    },


    'status.subIndex': function (newValue, oldValue) {
      console.log(newValue)
    },
    'status.defaultInput': function (newValue, oldValue) {
      console.log(newValue)
    }
  },

  methods: {




    // 输入框获得焦点时的处理函数
    onInputFocus () {
      if (this.status.type === 'mainInputBox')
        this.status.isButtonsShow = true
    },

    // 点击输入框“取消”按钮的处理函数
    onCancel () {
      if (this.status.type === 'mainInputBox') {
        this.status.isButtonsShow = false
      } else {
        this.status.isShow = false
        this.status.inputValue = ''
      }
    },

    // 点击输入框“发送”按钮的处理函数
    onSubmit: async function () {
      let fromWhom = {
        name: this.commentName,
        email: this.commentEmail,
        site: this.commentSitePrefix + this.commentSite
       }
      let rememberUser = this.rememberMe
      let articleId = this.comment.articleId
      // 父评论输入框逻辑
      if (this.status.type === 'mainInputBox') {
        var dataObj = {    // 定义父评论需要保存的数据对象
            content: this.inputValue,
            articleId,
            fromWhom
          }
        let {data} = await this.$axios.post('/api/comments', dataObj)
        let {success, message} = data
        success ? this.$message.success(message) : this.$message.error(message)
      } else {  // 子评论输入框逻辑
        let content =
          this.status.isReplyToParent   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
          ? this.status.inputValue
          : this.status.inputValue.replace('@' + this.subComment.fromName, '').trim()
          // : this.status.inputValue.replace(this.status.defaultValue).trim()
        var toWhom =
          this.status.isReplyToParent
          ? {
            name: this.comment.fromWhom.name,
            email: this.comment.fromWhom.email,
            site: this.comment.fromWhom.site
          }
          : {
            name: this.subComment.fromWhom.name,
            email: this.subComment.fromWhom.email,
            site: this.subComment.fromWhom.site
          }
        var dataObj = {
          id: this.comment._id,
          isReplyToParent: this.status.isReplyToParent,
          content,
          fromWhom,
          toWhom
        }
        let {data} = await this.$axios.patch('/api/comments', dataObj)
        let { success, message } = data
        success ? this.$message.success(message) : this.$message.error(message)
      }
      this.$store.dispatch('comments/fetchCommentList', articleId)  // 更新vuex中commentList的数据
    }

  }
}
</script>

<style>
  .el-select .el-input {
    width: 95px;
  }
</style>
