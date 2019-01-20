<template>
  <section>
    <!-- 父级评论区 -->
    <div>
      <el-row>
        <el-col :span="2">
          <img :src="getUserAvatar(comment.fromWhom.email)" alt="">
        </el-col>
        <el-col :span="4">
          <div>
            <p>{{ comment.fromWhom.name }}</p>
            <p>{{ comment.createTime.fullDate }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-html="comment.content" />
    <div>
      <span>
        <el-button @click="likeComment(comment)">
          <i :class="['iconfont', checkCommentLiked(comment._id) ? 'icon-like' : 'icon-like1']" />
          <span>{{ comment.likes ? comment.likes+'人赞' : '赞' }}</span>
        </el-button>
      </span>
      <span>
        <el-button @click="onClickReply($event, true)"><i>icon</i>回复</el-button>
      </span>
    </div>
    <!-- 子评论区 -->
    <div>
      <article v-for="subComment in comment.subComments" :key="subComment._id">
        <div>
          <span>{{ subComment.fromWhom.name }}</span><span>: </span>
          <span>{{ subComment.isReplyToParent ? '' : '@' + subComment.toWhom.name }}</span>
          <span style="display:inline-block" v-html="subComment.content" />
        </div>
        <div>
          <span>{{ subComment.createTime.fullDate }}</span>
          <el-button @click="onClickReply($event, false, subComment)"><i>icon</i>回复</el-button>
        </div>
      </article>
      <div>
        <el-button @click="onClickReply($event, true)">
          <i class="el-icon-edit" />
          <span>添加新评论</span>
        </el-button>
      </div>
      <transition name="el-fade-in-linear">
        <input-box
          v-show="isSubInputBoxShow"
          ref="inputbox"
          :is-main-input-box="false"
          :input-prefix="inputPrefix"
          @hideSubInputBox="onHide"
        />
      </transition>
    </div>
  </section>
</template>

<script>
import InputBox from './InputBox.vue'
import gravatar from 'gravatar'
export default {
  components: {
    InputBox
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isSubInputBoxShow: false,
      currentButton: {},
      currentSubComment: {},
      isReplyToParent: true,   // 是否是对父评论的回复
      isCommentLiked: false,
      likedComments: [],
      inputPrefix: '',   //输入框前缀，如：”@某人“
    }
  },

  mounted () {
    this.readUserCache()
  },

  methods: {
    // 读取保存在本地的用户点赞信息
    readUserCache () {
      if (window.localStorage) {
        let likedComments = window.localStorage.getItem('liked_comments')
        if (likedComments) this.likedComments = JSON.parse(likedComments)
      }
    },

    getUserAvatar (email) {
      let options= {
        protocol: 'https',
        size: '100',
        default: `https://api.adorable.io/avatars/100/${email}.png`,
      }
      return gravatar.url(email, options)
    },

    // 对评论点赞处理函数
    async likeComment () {
    // 当comment上isCommentLiked属性为false时，点赞后设置该属性为true
      if ( !this.checkCommentLiked(this.comment._id) ) {
        try {
          await this.$axios.put(`/api/comments/like/${this.comment._id}`)
          this.$store.commit('comments/likeComment', this.comment._id)
          this.likedComments.push(this.comment._id)
        } catch (err) {
          this.$message.error('评论点赞失败，' + err)
        }
      } else {
        try {
          await this.$axios.delete(`/api/comments/like/${this.comment._id}`)
          this.$store.commit('comments/dislikeComment', this.comment._id)
          let index = this.likedComments.findIndex(element => Object.is(element, this.comment._id))
          this.likedComments.splice(index, 1)
        } catch (err) {
          this.$message.error(err)
        }
      }
      window.localStorage.setItem('liked_comments', JSON.stringify(this.likedComments))
    },

    checkCommentLiked (commentId) {
      return this.likedComments.includes(commentId)
    },

    onHide () {
      this.isSubInputBoxShow = false
    },

    // 定义函数：当点击“回复”或“添加新评论”按钮时执行相关逻辑
    async onClickReply (event, isReplyToParent, subComment) {
      // 如再次点击的不是同一个按钮，则显示输入框
      if(this.currentButton !== event.currentTarget) {
        this.isSubInputBoxShow = true
        this.currentButton = event.currentTarget
      } else {
      // 如点击的是同一个按钮，则循环 “隐藏|显示” 输入框
        this.isSubInputBoxShow = !this.isSubInputBoxShow
      }
      this.isReplyToParent = isReplyToParent
      // 如 isReplyToParent 为true，表示直接回复父级评论，设置输入框的初始值为‘’，否则表示回复子评论，设置评论输入框的初始值为“@某人”
      this.inputPrefix = isReplyToParent ? '' : '@' + subComment.fromWhom.name + ' '
      // 如 isReplyToParent 为false（回复子评论），设置currSubComment为当前传入的subComment
      this.currentSubComment = isReplyToParent ? '' : subComment
      // 在下一个event loop，让输入框获得焦点
      await this.$nextTick()
      this.$refs.inputbox.$el.querySelector('textarea').focus()
    }

  }
}
</script>

<style>
  .el-select .el-input {
    width: 95px;
  }
</style>
