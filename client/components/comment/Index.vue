<template>
  <section>
    <div class="main-inptut-box">
      <img
        :src="avatarUrl || '/avatar_unknow_user_45.png'" :alt="'user avatar' || 'anonymous User'"
        class="avatar"
      >
      <input-box :is-main-input-box="true" @onInputBlur="getAvatar" />
    </div>
    <p class="comment-header">{{ comments.length }}&nbsp;条评论</p>
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
