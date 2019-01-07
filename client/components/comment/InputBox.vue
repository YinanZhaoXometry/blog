<template>
  <section>
    <transition name="fade-wrapper">
      <div v-show="status.isShow">
        <el-input
          v-model="status.inputValue"
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
      rememberMe: false
    }
  },
  computed: {
    comment () {
      return this.$store.state.comments.currentComment
    },
    subComment () {
      return this.$store.state.comments.currentSubComment
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
    onSubmit () {
      let fromWhom = {
        name: this.commentName,
        email: this.commentEmail,
        site: this.commentSitePrefix + this.commentSite
       }
      let rememberUser = this.rememberMe
      let articleId = window.location.pathname.split('/')[2]  // 通过URL地址获取对应文章id（articleId）
      if (this.status.type === 'mainInputBox') {  // 父评论输入框逻辑
        var dataObj = {    // 定义父评论需要保存的数据对象
            content: this.status.inputValue,
            articleId,
            fromWhom
          }
        this.$axios.post('/api/comments', dataObj)
      } else {  // 子评论输入框逻辑
        let content =
          this.status.isReplyToParent   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
          ? this.status.inputValue
          : this.status.inputValue.replace('@' + this.subComment.fromName, '').trim()
        var toWhom =
          this.status.isReplyToParent
          ? {
            name: this.comment.fromName,
            email: this.comment.fromId,
            site: this.comment.fromAvatar
          }
          : {
            name: this.subComment.fromName,
            email: this.subComment.fromId,
            site: this.subComment.fromAvatar
          }
        var dataObj = {
          _id: this.comment.id,
          isReplyToParent: this.status.isReplyToParent,
          content,
          fromWhom,
          toWhom
        }
        this.$axios.patch('/api/comments', dataObj)
      }
    }

  }
}
</script>

<style>
  .el-select .el-input {
    width: 95px;
  }
</style>
