<template>
  <section>
    <transition name="fade-wrapper">
      <div v-show="isShow">
        <el-input
          v-model="inputComment"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论...（支持MarkDown，被你@的用户会收到邮件通知）"
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
          @focus="onInputFocus"
        />
        <transition name="fade">
          <div v-show="type === 'alwaysShowInput' ? isButtonsShow : true">
            <span @click="onCancel">取消</span>
            <el-button
              type="success"
              round
              @click="onSubmit"
            >
              确定
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
      inputComment: ''
    }
  },

  watch: {
    inputValue: function (newValue, oldValue) {
      this.inputComment = newValue
    }
  },

  methods: {
    onCancel () {
      if (this.type === 'alwaysShowInput') {
        this.isButtonsShow = false
      } else {
        this.$emit('cancel')
        this.inputComment = ''
      }
    },

    // 评论框获得焦点时的处理函数
    onInputFocus () {
      if (this.type === 'alwaysShowInput')
        this.isButtonsShow = true
    },

    onSubmit () {

    }
  }
}
</script>
