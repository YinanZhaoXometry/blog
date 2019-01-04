<template>
  <section>
    <p>评论</p>
    <input-box type="alwaysShowInput" :is-show="true" />
    <p>{{ comments.data.length }}&nbsp;条评论</p>
    <one-comment
      v-for="item in comments.data"
      :key="item.id"
      :comment="item"
    />
  </section>
</template>

<script>
import OneComment from './OneComment.vue'
import InputBox from './InputBox.vue'
import comments from '~/mock/CommentData'

export default {
  components: {
    InputBox,
    OneComment
  },
  data () {
    return {
      comments,
    }
  },

  methods: {
  }
}
</script>
