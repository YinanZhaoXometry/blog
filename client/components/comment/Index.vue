<template>
  <section>
    <p>评论</p>
    <transition name="fade-wrapper">
      <div>
        <el-row>
          <el-col :span="2">
            <div>
              <!-- <img :src="userAvatar || 'https://api.adorable.io/avatars/80/abott@adorable.png'" alt="fromWhom.name || '匿名用户'"> -->
              <img :src="'https://api.adorable.io/avatars/80/abott@adorable.png'" alt="fromWhom.name || '匿名用户'">
            </div>
          </el-col>
          <el-col :span="22">
            <input-box :is-main-input-box="true" />
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
import gravatar from 'gravatar'

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
    }
  },
  computed: {
    comments () {
      return this.$store.state.comments.commentList
    }
  }
}
</script>
