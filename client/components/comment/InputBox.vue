<template>
  <section>
    <transition name="fade-wrapper">
      <div v-show="isShow">
        <el-input
          v-model="commentContent"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
          @focus="onInputFocus"
        />
        <transition name="fade">
          <div v-show="type === 'alwaysShowInput' ? isButtonsShow : true">
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
            <el-button
              type="success"
              round
              @click="onSubmit"
            >
              发送
            </el-button>
          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
    }
  },

  data () {
    return {
      isButtonsShow: false,
      commentContent: '',
      commentSitePrefix: 'http://',
      commentSite: '',
      commentName: '',
      commentEmail: '',
      rememberMe: false
    }
  },

  watch: {
    inputValue: function (newValue, oldValue) {
      this.commentContent = newValue
    }
  },

  methods: {
    onCancel () {
      if (this.type === 'alwaysShowInput') {
        this.isButtonsShow = false
      } else {
        this.$emit('cancel')
        this.commentContent = ''
      }
    },

    // 评论框获得焦点时的处理函数
    onInputFocus () {
      if (this.type === 'alwaysShowInput')
        this.isButtonsShow = true
    },

    onSubmit () {
      let list = window.location.pathname.split('/')  // 通过URL地址读取articleId
      let articleId = list[2]
      let dataObj = {
        content: this.commentContent,
        name: this.commentName,
        email: this.commentEmail,
        site: this.commentSitePrefix + this.commentSite,
        articleId
      }
      this.$axios.post('/api/comments', dataObj)
    }
  }
}
</script>

<style>
  .el-select .el-input {
    width: 95px;
  }
</style>
