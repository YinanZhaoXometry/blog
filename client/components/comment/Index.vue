<template>
  <section>
    <p>评论</p>
    <transition name="fade-wrapper">
      <div>
        <el-row>
          <el-col :span="2">
            <div>
              <img :src="avatarUrl || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100&f=y&d=mp'" :alt="avatarUrl || '匿名用户'">
            </div>
          </el-col>
          <el-col :span="22">
            <input-box :is-main-input-box="true" @onInputBlur="getAvatar" />
          </el-col>
        </el-row>
      </div>
    </transition>
    <p>{{ comments.length }}&nbsp;条评论</p>
    <comment v-for="item in comments" :key="item.id" :comment="item" />
  </section>
</template>

<script>
import Comment from './Comment.vue'
import InputBox from './InputBox.vue'

export default {
  components: {
    Comment,
    InputBox
  },

  props: {
    articleId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      likedComments: [],
      avatarUrl: ''
    }
  },
  computed: {
    comments () {
      return this.$store.state.comments.commentList
    },
  },
  mounted () {
    let userInfo = window.localStorage.getItem('user_info')
    if (userInfo) this.avatarUrl = JSON.parse(userInfo).avatar
  },
  methods: {
    getAvatar (avatarUrl) {
      this.avatarUrl = avatarUrl
    }
  }
}
</script>
