<template>
  <section>
    <el-input
      v-model="inputValue"
      type="textarea"
      :rows="3"
      placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
      resize="none"
      :autosize="{minRows: 3, maxRows: 6}"
      @focus="isButtonsShow = true"
    />
    <transition name="el-fade-in-linear">
      <div v-show="isMainInputBox ? isButtonsShow : true">
        <!-- 填写用户信息区域 -->
        <el-row v-if="!hasUserCache || isEditUserCache" type="flex">
          <el-col :span="6"><el-input v-model="fromWhom.name" placeholder="称呼 *" /></el-col>
          <el-col :span="6"><el-input v-model="fromWhom.email" placeholder="邮箱 *" @blur="getUserAvatar(); $emit('onInputBlur', fromWhom.avatar)" /></el-col>
          <el-col :span="8">
            <el-input v-model="fromWhom.site" placeholder="个人网址(选填)">
              <el-select slot="prepend" v-model="fromWhom.sitePrefix" placeholder="请选择">
                <el-option label="http://" value="http://" />
                <el-option label="https://" value="https://" />
              </el-select>
            </el-input>
          </el-col>
          <el-col v-if="!isEditUserCache" :span="4">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          </el-col>
          <el-col v-else :span="4">
            <el-button type="danger" plain icon="el-icon-close" @click="isEditUserCache = false; readUserCache()" />
            <el-button type="success" plain icon="el-icon-check" @click="updateUserCache" />
          </el-col>
        </el-row>
        <!-- 按钮区域 -->
        <el-button round>😊</el-button>
        <span @click="onCancel">取消</span>
        <el-button
          type="success"
          round
          @click="isMainInputBox ? submitMainComment() : submitChildComment()"
        >
          发送
        </el-button>
        <!-- 修改用户信息区域 -->
        <div v-if="hasUserCache">
          <strong>{{ fromWhom.name }}</strong>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-setting" />
              账户设置
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="isEditUserCache = true">修改信息</el-dropdown-item>
              <el-popover
                v-model="isPopoverShow"
                placement="top"
                width="160"
              >
                <p>确定要清空用户信息吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="isPopoverShow=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="clearUserCache">确定</el-button>
                </div>
                <el-dropdown-item slot="reference">清空信息</el-dropdown-item>
              </el-popover>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import gravatar from 'gravatar'

export default {
  props: {
    isMainInputBox: {
      type: Boolean,
      required: true,
    },
    inputPrefix: {
      type: String,
      default:''
    }
  },

  data () {
    return {
      inputValue: '',
      isButtonsShow: false,
      isPopoverShow: false,

      // 用户相关
      hasUserCache: false,
      isEditUserCache: false,
      rememberMe: false,
      fromWhom: {
        name: '',
        email: '',
        sitePrefix: 'http://',
        site: '',
        avatar: '',
      },

      // 用户信息验证
      regExps: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        site: /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      }
    }
  },

  computed: {
    articleId () {  // 获取文章id
      return window.location.pathname.split('/')[2]
    }
  },

  watch: {
    inputPrefix: function (newValue, oldValue) {
      return this.inputValue = newValue
    }
  },

  mounted () {
    this.readUserCache()
  },


  methods: {
    // 读取保存在本地的 用户信息
    readUserCache () {
      if (window.localStorage) {
        let fromWhom = window.localStorage.getItem('user_info')
        if (fromWhom) {
          this.fromWhom = JSON.parse(fromWhom)
          this.hasUserCache = true
          // this.updateUserGravatar()
        }
      }
    },
    updateUserCache () {
      let msg = this.checkUserInfo()
      if (msg) return this.$message.warning(msg)
      this.saveUserCache()
      this.isEditUserCache = false
      this.$message.success('信息修改成功')
    },
    saveUserCache () {
      window.localStorage.setItem('user_info', JSON.stringify(this.fromWhom))
      this.hasUserCache = true
    },
    clearUserCache () {
      this.isPopoverShow=false
      window.localStorage.removeItem('user_info')
      this.hasUserCache = false
      this.clearUserInput()
    },

    checkUserInfo () {
      if(!this.fromWhom.name) return '请输入名字'
      if(!this.fromWhom.email) return '请输入邮箱'
      if(!this.regExps.email.test(this.fromWhom.email)) return '邮箱不合法'
      if(this.fromWhom.site && !this.regExps.site.test(this.fromWhom.site)) return '网址不合法'
    },
    clearUserInput () {
      this.inputValue = ''
      if(!this.hasUserCache) {
        Object.keys(this.fromWhom).forEach(key => this.fromWhom[key] = '')
        this.fromWhom.sitePrefix = 'http://'
      }
      this.rememberMe = false
    },

    getUserAvatar () {
      let isEmailValid = this.regExps.email.test(this.fromWhom.email)
      if (isEmailValid) {
        let options= {
          protocol: 'https',
          size: '100',
          default: `https://api.adorable.io/avatars/100/${this.fromWhom.email}.png`,
        }
        this.fromWhom.avatar = gravatar.url(this.fromWhom.email, options)
      }
    },

    // 定义点击取消评论处理函数
    onCancel () {
      this.$emit('hideSubInputBox')
      this.isButtonsShow = false
      this.clearUserInput()
    },

    // 定义提交父级评论处理函数
    async submitMainComment () {
      try {
        if(!this.inputValue.trim()) return this.$message.warning('评论内容不能为空')
        let msg = this.checkUserInfo()
        if (msg) return this.$message.warning(msg)

        let dataObj = {    // 定义父评论需要保存的数据对象
          content: this.inputValue.trim(),
          fromWhom: this.fromWhom,
          articleId: this.articleId
        }
        var {data} = await this.$axios.post('/api/comments', dataObj)
        let {message} = data
        this.$message.success(message)
        this.$store.dispatch('comments/fetchCommentList', this.articleId)  // 更新vuex中commentList的数据
        this.isButtonsShow = false
        if (this.rememberMe) { this.saveUserCache() }
      } catch (err) {
        let message = err.response.data ? err.response.data : err.toString()
        this.$message.error(message)
      }
      this.clearUserInput()
    },

    // 定义提交子评论处理函数
    async submitChildComment () {
      try {
        if(!this.inputValue.trim()) return this.$message.warning('评论内容不能为空')
        let msg = this.checkUserInfo()
        if (msg) return this.$message.warning(msg)

        let isReplyToParent = this.$parent.isReplyToParent
        let content =
          isReplyToParent   // 将子评论内容中的”@xxx“字段去除，便于后续数据操作和页面显示。
          ? this.inputValue.trim()
          : this.inputValue.replace('@' + this.$parent.currentSubComment.fromWhom.name, '').trim()
        let toWhom =
          isReplyToParent
          ? this.$parent.comment.fromWhom
          : this.$parent.currentSubComment.fromWhom
        let dataObj = {
          _id: this.$parent.comment._id,
          fromWhom: this.fromWhom,
          toWhom,
          content,
          isReplyToParent
        }
        var {data} = await this.$axios.patch('/api/comments', dataObj)
        this.$emit('hideSubInputBox')
        let {message} = data
        this.$message.success(message)
        this.$store.dispatch('comments/fetchCommentList', this.articleId)  // 更新vuex中commentList的数据
        if (this.rememberMe) { this.saveUserCache() }
      } catch (err) {
        let message = err.response.data ? err.response.data : err.toString()
        this.$message.error(message)
      }
      this.clearUserInput()
    }

  }
}
</script>
