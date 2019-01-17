<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleDialogClose"
    width="80%"
    height="800"
  >
    <div slot="title">
      <h4>选择图片</h4>
      <el-steps :active="activeStep" align-center process-status="finish" finish-status="wait">
        <el-step title="从素材库选择封面" />
        <el-step title="剪切封面" />
      </el-steps>
    </div>
    <div>
      <el-row>
        <section v-if="activeStep < 1">
          <el-col :span="6">
            <el-menu default-active="0">
              <el-menu-item index="0">全部图片(53)</el-menu-item>
              <el-menu-item index="1">未分组(8)</el-menu-item>
              <el-menu-item index="2">文章配图(45)</el-menu-item>
              <el-menu-item index="3">＋新建分组</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-upload
                action="http://localhost:3030/api/upload/images"
                :with-credentials="true"
                :on-change="uploadStatusChange"
              >
                <el-button type="primary" size="small">本地上传</el-button>
              </el-upload>
            </el-row>
            <br>
            <el-row>img list</el-row>
          </el-col>
        </section>
        <section v-else>
          <el-row>
            <el-col :span="10">
              <p><b>剪裁封面</b></p>
              <div style="width:300px;height:300px;border:1px solid gray;display:inline-block">
                <vue-cropper
                  ref="cropper"
                  :src="imgUrl"
                  alt="Image to be cropped"
                  drag-mode="crop"
                  :auto-crop-area="0.5"
                  :min-container-width="200"
                  :min-container-height="180"
                  :movable="false"
                  :zoomable="false"
                  :background="true"
                  :img-style="{ 'width': '300px', 'height': '300px' }"
                  @crop.native="handleCrop"
                />
              </div>
              <p>可选择一个尺寸的封面单独剪裁</p>
              <el-button :autofocus="false" type="text" @click="setCropperAspectRatio(webRatio)">1:1</el-button>
              <el-button :autofocus="false" type="text" @click="setCropperAspectRatio(mobileRatio)">2.35:1</el-button>
            </el-col>
            <el-col :span="14">
              <p><b>预览封面</b></p>
              <el-row>
                <el-col :span="6">
                  <img :src="croppedUrlWeb" style="width:130px;height:130px;border:1px solid gray" alt="Cropped Image">
                </el-col>
                <el-col :span="18">
                  <p><b>web端封面 (1:1)</b></p>
                  <p>通过web端浏览文章页面（卡片视图）的用户，将看到此封面。</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <img :src="croppedUrlMobile" style="width:130px;height:56px;border:1px solid gray" alt="Cropped Image">
                </el-col>
                <el-col :span="18">
                  <span><b>移动端封面 (2.35:1)</b></span>
                  <p>通过移动端浏览文章页面（卡片视图）的用户，将看到此封面。</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </section>
      </el-row>
    </div>
    <div slot="footer" style="text-align:center">
      <el-button v-if="activeStep < 1" type="primary" size="small" @click="nextStep">下一步</el-button>
      <div v-else>
        <el-button size="small" @click="lastStep">上一步</el-button>
        <el-button type="primary" size="small" @click="finishCoverSetting">完成</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs'
export default {
  components: {
    VueCropper
  },

  props: {
    isDialogShow: {
      type: Boolean,
      required: true,
    }
  },

  data () {
    return {
      // 对话框相关
      activeStep: 0,
      dialogVisible: false,

      // 图片剪裁相关
      imgUrl: '../../../static/upload/500.jpg',
      croppedUrlWeb: '',
      croppedUrlMobile: '',
      isCropForWeb: true,
      webRatio: 1,
      mobileRatio: 2.35,
    }
  },

  watch: {
    isDialogShow (newValue, oldValue) {
      this.dialogVisible = newValue
    }
  },

  methods: {
    /* 封面图片选择、剪裁相关方法 */
    handleSuccessUpload () {

    },
    beforeUpload () {

    },
    uploadStatusChange (file, fileList) {
      console.log('file:',file)
      console.log('filelist:',fileList)
    },

    handleDialogClose () {
      this.dialogVisible = false
      this.$emit('dialogFinish', this.dialogVisible)
      this.activeStep = 0
    },
    nextStep () {
      if (this.activeStep >= 1) return
      this.activeStep++
    },
    lastStep () {
      this.activeStep=0
    },
    finishCoverSetting () {
      this.handleDialogClose()
    },

    setCropperAspectRatio (ratio) {
      this.isCropForWeb =
        ratio === this.webRatio
        ? true
        : false
      this.$refs.cropper.setAspectRatio(ratio)
    },
    handleCrop () {
      let opts = {
        imageSmoothingEnabled: false,
      }
      let getCroppedCanvas = this.$refs.cropper.getCroppedCanvas(opts).toDataURL()
      this.isCropForWeb
        ? this.croppedUrlWeb = getCroppedCanvas
        : this.croppedUrlMobile = getCroppedCanvas
    },

  }

}
</script>
