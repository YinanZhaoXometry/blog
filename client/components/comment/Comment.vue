<template>
  <section>
    <div>
      <img src="" alt="">
      <div>
        <p>{{ comment.fromWhom.name }}</p>
        <p>{{ comment.createTime.fullDate }}</p>
      </div>
    </div>
    <p>{{ comment.content }}</p>
    <p>
      <span>
        <el-button @click="onClickLike(comment)">
          <i class="iconfont icon-like1" />
          <span>{{ comment.likes ? comment.likes+'人赞' : '赞' }}</span>
        </el-button>
      </span>
      <span>
        <el-button @click="onClickReply($event, true)"><i>icon</i>回复</el-button>
      </span>
    </p>
    <!-- 子评论区开始 -->
    <div>
      <article v-for="subComment in comment.subComments" :key="subComment._id">
        <p>
          <span>{{ subComment.fromWhom.name }}</span><span>: </span>
          <span>{{ subComment.isReplyToParent ? '' : '@' + subComment.toWhom.name }}</span>
          <span>{{ subComment.content }}</span>
        </p>
        <p>
          <span>{{ subComment.createTime.fullDate }}</span>
          <el-button @click="onClickReply($event, false, subComment)"><i>icon</i>回复</el-button>
        </p>
      </article>
      <p>
        <el-button @click="onClickReply($event, true)">
          <i class="el-icon-edit" />
          <span>添加新评论</span>
        </el-button>
      </p>
      <div v-show="isShow">
        <el-input
          ref="inputbox"
          v-model="inputValue"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
        />
        <transition name="fade">
          <div>
            <el-row type="flex">
              <el-col :span="6"><el-input v-model="commentName" placeholder="称呼 *" /></el-col>
              <el-col :span="6"><el-input v-model="commentEmail" placeholder="邮箱 *" /></el-col>
              <el-col :span="8">
                <el-input v-model="commentSite" placeholder="个人网址">
                  <el-select slot="prepend" v-model="commentSitePrefix">
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
    </div>
    <!-- 子评论区结束 -->
  </section>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isShow: false,
      currentButton: {},
      isReplyToParent: true,   // 是否是对父评论的回复
      inputValue: '',
      commentName: '',
      commentEmail: '',
      commentSitePrefix: 'http://',
      commentSite: '',
      rememberMe: false,
      currSubComment: {},
      isLiked: false
    }
  },

  methods: {
    // 定义函数：当点击“回复”或“添加新评论”按钮时执行相关逻辑
    async onClickReply (event, isReplyToParent, subComment) {
      // 如再次点击的不是同一个按钮，则显示输入框
      if(this.currentButton !== event.currentTarget) {
        this.isShow = true
        this.currentButton = event.currentTarget
      } else {
      // 如点击的是同一个按钮，则循环 “隐藏|显示” 输入框
        this.isShow = !this.isShow
      }
      this.isReplyToParent = isReplyToParent
      // 如 isReplyToParent 为true，表示直接回复父级评论，设置输入框的初始值为‘’，否则表示回复子评论，设置评论输入框的初始值为“@某人”
      this.inputValue = isReplyToParent ? '' : '@' + subComment.fromWhom.name + ' '
      // 如 isReplyToParent 为false（回复子评论），设置currSubComment为当前传入的subComment
      this.currSubComment = isReplyToParent ? '' : subComment
      // 在下一个event loop，让输入框获得焦点
      await this.$nextTick()
      this.$refs.inputbox.$el.querySelector('textarea').focus()
    },

    // 点击like按钮的处理函数
    onClickLike () {
    // 默认comment上不存在isLike属性，当点击like按钮设置该属性为true
      if (this.isLiked) {
        // this.$set(comment,'isLiked', true)
        this.isLiked = false
        this.comment.likes--
      } else {
        this.isLiked = true
        this.comment.likes++
      }
    },

    // 点击输入框“取消”按钮的处理函数
    onCancel () {
      this.isShow = false
      this.inputValue = ''
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
      let content =
        this.isReplyToParent   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
        ? this.inputValue
        : this.inputValue.replace('@' + this.currSubComment.fromWhom.name, '').trim()
      var toWhom =
        this.isReplyToParent
        ? {
          name: this.comment.fromWhom.name,
          email: this.comment.fromWhom.email,
          site: this.comment.fromWhom.site
        }
        : {
          name: this.currSubComment.fromWhom.name,
          email: this.currSubComment.fromWhom.email,
          site: this.currSubComment.fromWhom.site
        }
      var dataObj = {
        _id: this.comment._id,
        isReplyToParent: this.isReplyToParent,
        content,
        fromWhom,
        toWhom
      }
      let {data} = await this.$axios.patch('/api/comments', dataObj)
      let { success, message } = data
      success ? this.$message.success(message) : this.$message.error(message)
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
