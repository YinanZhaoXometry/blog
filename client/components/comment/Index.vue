<template>
  <section>
    <p>评论</p>
    <!-- <input-box :status="mainInputBoxStatus" @submitComment="handleSubmit(arguments)" />   -->
    <input-box :status="mainInputBoxStatus" />  <!-- 文章评论输入框 -->
    <p>{{ comments.data.length }}&nbsp;条评论</p>
    <comment v-for="item in comments.data" :key="item.id" :comment="item" />
  </section>
</template>

<script>
import InputBox from './InputBox.vue'
import Comment from './Comment.vue'
import comments from '~/mock/CommentData'

export default {

  components: {
    InputBox,
    Comment
  },
  data () {
    return {
      comments,
      mainInputBoxStatus: {
        type: 'mainInputBox',
        isShow: true,
        isButtonsShow: false,
        inputValue: ''
      }
    }
  },

  methods: {
     // 点击输入框“发送”按钮的处理函数
    // handleSubmit (args, commentInfo) {
    //   let { isMainComment, name, email, site, rememberUser } = args[0]
    //   let articleId = window.location.pathname.split('/')[2]  // 通过URL地址获取对应文章id（articleId）
    //   let fromWhom = { name, email, site }
    //   if (isMainComment) {  // 文章父评论逻辑
    //     var dataObj = {
    //       content: this.mainInputStatus.inputValue,
    //       articleId,
    //       fromWhom
    //     }
    //     this.$axios.post('/api/comments', dataObj)
    //   } else {  // 文章子评论逻辑
    //     let toWhom = {
    //         name: this.isReplyToMain ? commentInfo.fromName : this.subCommentInfo.fromName,
    //         email: this.isReplyToMain ? commentInfo.fromId : this.subCommentInfo.fromId,
    //         site: this.isReplyToMain ? commentInfo.fromAvatar : this.subCommentInfo.fromAvatar
    //       }
    //     let content = this.isReplyToMain   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
    //       ? this.subInputStatus.inputValue
    //       : this.subInputStatus.inputValue.replace('@' + this.subCommentInfo.fromName, '').trim()
    //     var dataObj = {
    //       _id: commentInfo.id,
    //       isReplyToMain: this.isReplyToMain,
    //       content,
    //       fromWhom,
    //       toWhom
    //     }
    //     this.$axios.patch('/api/comments', dataObj)
    //   }
    // }

  }
}
</script>
