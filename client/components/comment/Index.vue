<template>
  <section>
    <p>评论</p>
    <input-box />
    <p>{{ comments.data.length }}&nbsp;条评论</p>
    <article v-for="item in comments.data" :key="item.id">
      <div>
        <div>
          <img src="" alt="">
          <div>
            <p>{{ item.fromName }}</p>
            <p>{{ item.date }}</p>
          </div>
        </div>
        <p>{{ item.content }}</p>
        <p>
          <span>
            <i class="iconfont icon-like1" />
            <el-button><span>赞</span></el-button>
          </span>
          <span>
            <i>icon</i>
            <span><el-button>回复</el-button></span>
          </span>
        </p>
      </div>
      <div>
        <div v-for="reply in item.reply" :key="reply.id">
          <p>
            <span>{{ reply.fromName }}</span><span>: </span>
            <span>@{{ reply.toName }}</span>
            <span>{{ reply.content }}</span>
          </p>
          <p>
            <span>{{ reply.date }}</span>
            <i>icon</i><span><el-button>回复</el-button></span>
          </p>
        </div>
        <div>
          <i class="el-icon-edit" />
          <el-button><span>添加新评论</span></el-button>
        </div>
        <input-box />
      </div>
    </article>
  </section>
</template>

<script>
import InputBox from './InputBox.vue'
import comments from '~/mock/CommentData'

export default {
  components: {
    InputBox
  },
  data () {
    return {
      comments
    }
  }
}
</script>
