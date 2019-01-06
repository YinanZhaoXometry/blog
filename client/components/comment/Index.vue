<template>
  <section>
    <p>评论</p>
    <input-box :status="mainInputStatus" @submitComment="handleSubmit(arguments)" />  <!-- 文章评论输入框 -->
    <p>{{ comments.data.length }}&nbsp;条评论</p>
    <!-- 评论区开始 -->
    <article v-for="comment in comments.data" :key="comment.id">
      <div>
        <img src="" alt="">
        <div>
          <p>{{ comment.fromName }}</p>
          <p>{{ comment.date }}</p>
        </div>
      </div>
      <p>{{ comment.content }}</p>
      <p>
        <span>
          <el-button @click="onClickLike(comment)">
            <i class="iconfont icon-like1" />
            <span>{{ comment.likeNum === 0 ? '赞' : comment.likeNum+'人赞' }}</span>
          </el-button>
        </span>
        <span>
          <el-button @click="toggleInputBox($event, true)"><i>icon</i>回复</el-button>
        </span>
      </p>
      <!-- 子评论区开始 -->
      <div>
        <article v-for="subComment in comment.reply" :key="subComment.content">
          <p>
            <span>{{ subComment.fromName }}</span><span>: </span>
            <span>{{ subComment.isReplyToMain ? '' : '@' + subComment.toName }}</span>
            <span>{{ subComment.content }}</span>
          </p>
          <p>
            <span>{{ subComment.date }}</span>
            <el-button @click="toggleInputBox($event, false, subComment)"><i>icon</i>回复</el-button>
          </p>
        </article>
        <p>
          <el-button @click="toggleInputBox($event, true)">
            <i class="el-icon-edit" />
            <span>添加新评论</span>
          </el-button>
        </p>
        <!-- 子评论输入框 -->
        <input-box :status="subInputStatus" @submitSubComment="handleSubmit(arguments, comment)" />
      </div>
      <!-- 子评论区结束 -->
    </article>
    <!-- 评论区结束 -->
  </section>
</template>

<script>
import InputBox from './InputBox.vue'
import comments from '~/mock/CommentData'

export default {
  components: {
    InputBox,
  },
  data () {
    return {
      comments,
      isShow: false,
      currentId: '',
      statusCode: 0,
      currentButton: {},
      isReplyToMain: true,
      subCommentInfo: {},
      mainInputStatus: {
        type: 'mainInputBox',
        isShow: true,
        isButtonsShow: false,
        inputValue: ''
      },
      subInputStatus: {
        type: 'subInputBox',
        isShow: false,
        isButtonsShow: true,
        inputValue: ''
      }
    }
  },

  methods: {
    // 显示|隐藏输入框的处理函数
    toggleInputBox (event, isReplyToMain, subCommentInfo) {
      // 如再次点击的不是同一个按钮，则显示输入框
      if(this.currentButton !== event.currentTarget) {
        this.subInputStatus.isShow = true
        this.currentButton = event.currentTarget
      } else {
      // 如再次点击的是同一个按钮，隐藏|显示 输入框
        this.subInputStatus.isShow = !this.subInputStatus.isShow
      }
      // 如传入参数 isReplyToMain 为true，表示直接回复父级评论，设置评论输入框的初始值为‘’
      // 如为false，表示回复平级子评论，设置评论输入框的初始值为“@某人”
      this.subInputStatus.inputValue = isReplyToMain ? '' : '@' + subCommentInfo.fromName + ' '
      this.isReplyToMain = isReplyToMain
      this.subCommentInfo = subCommentInfo
    },

    // 点击like按钮的处理函数
    onClickLike (comment) {
      // 默认comment上不存在isLike属性，当点击like按钮设置该属性为true
      if (comment.isLike === null) {
        this.$set(comment,'isLike', true)
        comment.likeNum++
      } else {
        comment.isLike ? comment.likeNum-- : comment.likeNum++
      }
      comment.isLike = !comment.isLike
    },


     // 点击输入框“发送”按钮的处理函数
    handleSubmit (args, commentInfo) {
      let { isMainComment, name, email, site, rememberUser } = args[0]
      let articleId = window.location.pathname.split('/')[2]  // 通过URL地址获取对应文章id（articleId）
      let fromWhom = { name, email, site }
      if (isMainComment) {  // 文章父评论逻辑
        var dataObj = {
          content: this.mainInputStatus.inputValue,
          articleId,
          fromWhom
        }
        this.$axios.post('/api/comments', dataObj)
      } else {  // 文章子评论逻辑
        let toWhom = {
            name: this.isReplyToMain ? commentInfo.fromName : this.subCommentInfo.fromName,
            email: this.isReplyToMain ? commentInfo.fromId : this.subCommentInfo.fromId,
            site: this.isReplyToMain ? commentInfo.fromAvatar : this.subCommentInfo.fromAvatar
          }
        let content = this.isReplyToMain   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
          ? this.subInputStatus.inputValue
          : this.subInputStatus.inputValue.replace('@' + this.subCommentInfo.fromName, '').trim()
        var dataObj = {
          _id: commentInfo.id,
          isReplyToMain: this.isReplyToMain,
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
