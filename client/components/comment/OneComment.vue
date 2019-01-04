<template>
  <section>
    <article>
      <div>
        <img src="" alt="">
        <div>
          <p>{{ comment.fromName }}</p>
          <p>{{ comment.date }}</p>
        </div>
      </div>
      <p>{{ comment.content }}</p>
      <p>
        <span>
          <el-button @click="onClickLike(comment)">
            <i class="iconfont icon-like1" />
            <span>{{ comment.likeNum === 0 ? '赞' : comment.likeNum+'人赞' }}</span>
          </el-button>
        </span>
        <span>
          <i>icon</i>
          <span>
            <el-button @click="toggleInputBox(1, comment)">回复</el-button>
          </span>
        </span>
      </p>
    </article>
    <article>
      <div v-for="(item,index) in comment.reply" :key="item.content">
        <p>
          <span>{{ item.fromName }}</span><span>: </span>
          <span>@{{ item.toName }}</span>
          <span>{{ item.content }}</span>
        </p>
        <p>
          <span>{{ item.date }}</span>
          <i>icon</i>
          <span>
            <el-button @click="toggleInputBox(index+3, comment, item.fromName)">回复</el-button>
          </span>
        </p>
      </div>
      <div>
        <i class="el-icon-edit" />
        <el-button @click="toggleInputBox(2,comment)">
          <span>添加新评论</span>
        </el-button>
      </div>
      <input-box
        :is-show="isShow"
        type="hideOnCancel"
        :input-value="inputComment"
        @cancel="isShow = !isShow"
      />
    </article>
  </section>
</template>

<script>
import InputBox from './InputBox.vue'


export default {
  components: {
    InputBox
  },

  props: {
    comment: {
      type: null,
      required: true
    }
  },

  data () {
    return {
      isShow: false,
      inputComment: '',
      currentId: '',
      statusCode: 0
    }
  },

  methods: {
    // 显示|隐藏输入框的处理函数
    toggleInputBox (code, comment, fromName) {
      if (fromName)
        this.inputComment = '@' + fromName + ' '
      else
        this.inputComment = ''

      /**
       * 判断输入框是否已显示，并执行以下逻辑：
       * 1）引入变量输入框状态码statusCode为：0——关闭，其他——打开
       * 2）当 statusCode不为0(打开状态) 关闭输入框，将statusCode赋值为0
       * 3）当 statusCode为0(关闭状态) 时显示输入框，将statusCode赋值为传入的code
       * 4）当 statusCode不等于传入code(表示用户点按了不同的按钮) 时显示输入框，将statusCode赋值为传入的code
       *
      */
      if (this.statusCode === 0 || this.statusCode !== code) {
        this.isShow = true
        this.statusCode = code
      } else {
        this.isShow = false
        this.statusCode = 0
        this.inputComment = ''
      }
    },

    // 点击like按钮的处理函数
    onClickLike (comment) {
      // 默认comment上不存在isLike属性，当点击like按钮设置该属性为true
      if (comment.isLike === null) {
        this.$set(comment,'isLike', true)
        comment.likeNum++
      } else {
        comment.isLike ? comment.likeNum-- : comment.likeNum++
      }
      comment.isLike = !comment.isLike
    }

  }
}
</script>
