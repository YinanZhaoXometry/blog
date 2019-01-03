<template>
  <section>
    <transition name="fade-wrapper">
      <div v-if="show">
        <el-input
          v-model="inputComment"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论..."
          resize="none"
          :autosize="{minRows: 3, maxRows: 6}"
          @focus="handleInputFocus"
        />
        <transition name="fade">
          <div v-show="showButtons">
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
  data () {
    return {
      show: true,
      showButtons: false,
      inputComment: ''
    }
  },

  methods: {
    onCancel () {
      this.showButtons = false
    },

    // 评论框获得焦点时的处理函数
    handleInputFocus () {
      this.showButtons = true
    },

    onSubmit () {

    }
  }
}
</script>
