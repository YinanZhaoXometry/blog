<template>
  <section>
    <p>评论</p>
    <transition name="fade-wrapper">
      <div>
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
          <div v-show="isButtonsShow">
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

    <p>{{ comments.length }}&nbsp;条评论</p>
    <comment v-for="item in comments" :key="item.id" :comment="item" />
  </section>
</template>

<script>
import Comment from './Comment.vue'

export default {
  components: {
    Comment
  },

  props: {
    articleId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isButtonsShow: false,
      inputValue: '',
      commentSitePrefix: 'http://',
      commentSite: '',
      commentName: '',
      commentEmail: '',
      rememberMe: false,
    }
  },

  computed: {
    comments () {
      return this.$store.state.comments.commentList
    }
  },

  methods: {
    // 输入框获得焦点时的处理函数
    onInputFocus () {
      this.isButtonsShow = true
    },

    // 点击输入框“取消”按钮的处理函数
    onCancel () {
      this.isButtonsShow = false
    },

    // 点击输入框“发送”按钮的处理函数
    onSubmit: async function () {
      let fromWhom = {
        name: this.commentName,
        email: this.commentEmail,
        site: this.commentSitePrefix + this.commentSite
       }
      let rememberUser = this.rememberMe
      let articleId = this.articleId
      var dataObj = {    // 定义父评论需要保存的数据对象
          content: this.inputValue,
          articleId,
          fromWhom
        }
      let {data} = await this.$axios.post('/api/comments', dataObj)
      let {success, message} = data
      success ? this.$message.success(message) : this.$message.error(message)
      this.$store.dispatch('comments/fetchCommentList', articleId)  // 更新vuex中commentList的数据
    }
  }
}
</script>
