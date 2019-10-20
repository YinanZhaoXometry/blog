<template>
  <el-dialog
    class="dialog"
    :width="config.width?config.width:'600px'"
    :visible.sync="config.isShow"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :center="true"
    :show-close="false"
    custom-class="dialog-custom"
  >
    <!-- dialog header -->
    <div slot="title" ref="dialogHeader" class="dialog-header">
      <template>
        <i class="el-icon-edit dialog-header-title-icon" />
        <span class="dialog-header-title">{{ config.title || '编辑' }}</span>
      </template>
      <div class="dialog-header-btns">
        <div class="header-btn-close dialog-header-btn" @click="closeDialog">
          <i
            class="el-icon el-icon-close btn-pointer"
            style="font-weight:bold;font-size:20px"
          />
        </div>
      </div>
    </div>

    <!-- dialog body -->
    <div
      ref="dialogBody"
      v-loading="config.isLoading"
      class="dialog-body"
      :style="{height: bodyHeight}"
    >
      <!-- 插槽 -->
      <slot />
    </div>

    <!-- dialog footer -->
    <div slot="footer" ref="dialogFooter" class="dialog-footer">
      <div class="footer-btn-box">
        <el-button
          class="dialog-footer-btn"
          size="small"
          :disabled="config.submitLoading"
          @click="closeDialog"
        >返 回</el-button>
        <el-button
          class="dialog-footer-btn"
          size="small"
          type="primary"
          :disabled="config.submitLoading"
          :loading="config.submitLoading"
          @click="submitconfig"
        >{{ config.submitLoading?'':'保 存' }}</el-button>
      </div>
      <!-- <div class="footer-btn-box">
        <el-button
          class="dialog-footer-btn"
          size="small"
          type="primary"
          @click="config.isShow = false"
        >确定</el-button>
      </div> -->
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  name: '',
  components: { },
  props: ['config'],
  data() {
    return {
    }
  },
  computed: {
    bodyHeight() {
      if (this.config.bodyHeight) {
        if (this.config.infoDataList) {
          // 无footer
          return this.config.bodyHeight + 50 + 'px'
        } else if (this.config.editDataList) {
          return this.config.bodyHeight + 'px'
        }
      } else {
          return '580px'

        // if (this.config.infoDataList) {
        //   // 无footer
        //   return '630px'
        // } else if (this.config.editDataList) {
        //   return '580px'
        // }
      }
    }
  },
  watch: {
    config:{
      handler: function (newVal, oldVal) {
        if (!newVal.isShow) {
          this.config.submitLoading = false
        }
        if (newVal.isShow) {
        }
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 预览图片
    previewImg (url) {
      this.img_info.isShow = true
      this.img_info.url = url
    },

    onSelectChange (elem) {
      this.$emit('selectChange', elem)
    },

    submitconfig() {
      // 如果表单校验不通过，则不允许提交
      if (this.$refs.dialogEdit && !this.$refs.dialogEdit.validateForm()) {
        return this.$msg.error('表单填写错误')
      }
      // 将表单数据处理后返回
      const obj = {}
      if (this.config.editDataList) {
        let returnMark = false
        this.config.editDataList.forEach(item => {
          item.list.forEach(elem => {
            if (elem.type == 'select' && elem.isObj) {
              const list = elem.options.filter(item => {
                return item.value == elem.value
              })
              obj[elem.name] = list[0]
            } else if (elem.type == 'textareaBtn' && elem.isObj) {
              obj[elem.name] = { value: elem.value, label: elem.label }
            } else if (elem.type == 'interval') {
              if (elem.value.min > elem.value.max) {
                this.$msg.warn('最小值不得超过最大值')
                returnMark = true
              }
              obj[elem.name] = elem.value
            } else {
              obj[elem.name] = elem.value
            }
          })
        })
        if (returnMark) return
      }
      if (this.config.toodDataList) {
        this.config.toodDataList.forEach(item => {
          item.list.forEach(elem => {
            if (elem.type == 'select' && elem.isObj) {
              const list = elem.options.filter(item => {
                return item.value == elem.value
              })
              obj[elem.name] = list[0]
            } else {
              obj[elem.name] = elem.value
            }
          })
        })
      }
      this.config.submitLoading = true
      if (this.config.action) {
        this.$emit(this.config.action, obj)
      } else {
        this.$emit('submit', obj)
      }
    },

    closeDialog() {
      this.config.isShow = false
      if (this.$refs.dialogEdit) {
        this.$refs.dialogEdit.clearFormValidate()
      }
    }
  }
}
</script>
<style lang="scss">
.dialog-body {
  padding: 0 20px !important;
}
.dialog {
  .el-dialog__header {
    padding: 0;
    position: relative;
    width: 100%;
    z-index: 2000;
    top:0;
  }
  .dialog-header {
    padding-left: 20px;
    text-align: left;
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e7eaec;

    padding-right: 10px;
    .dialog-header-title {
      color: #000;
      font-size: 18px;
      margin-left: 5px;
    }
    .dialog-header-title-icon {
      font-size: 18px;
    }
    .dialog-header-btns {
      float:right;
      height:50px;
      line-height: 50px;
      display: flex;
    }
    .dialog-header-btn {
      padding-right:8px;
      padding-left:8px;
      color: black;
      cursor: pointer;

    }
    .dialog-header-btn:hover {
      color: red;
    }
    .header-btn-min-box {
      display: flex;
      align-items: center;
    }
    .header-btn-minimize {
      display: inline-block;
      border-bottom: 2px solid #575765;
      width: 18px;
      height: 3px;
    }
    .header-btn-min-box:hover .header-btn-minimize {
      border-bottom: 2px solid blue;
    }

  }
  .el-dialog__body {
    overflow:auto !important;
    padding: 10px 0 !important;
  }

  .dialog-body-group-title {
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .dialog-body-group {
    padding-left: 40px;
    padding-right: 40px;
  }
  .el-dialog__footer {
    padding: 0;
    position: relative;
    width: 100%;
    z-index: 2000;
    overflow:hidden;
    bottom: 0;
  }
  .dialog-footer {
    background: #f9f9f9;
    height: 50px;
    line-height: 45px;
    border-top: 1px solid #e7eaec;
    color: #575765;
    .footer-btn-box {
      float: right;
      padding-right: 10px;
    }
    .dialog-footer-btn {
      margin: 0;
      margin-left: 2px;
      width: 65px;
    }
    .dialog-footer-btn.is-loading>span {
      display: none;
    }

  }
}
.dialog-custom {
  height: 700px;
}
</style>
