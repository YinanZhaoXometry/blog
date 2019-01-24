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
                action="http://localhost:3030/api/upload/images/"
                :with-credentials="true"
                :on-success="handleSuccessUpload"
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
                  :src="urlSourceImg"
                  alt="Image to be cropped"
                  drag-mode="crop"
                  :auto-crop-area="0.5"
                  :min-container-width="200"
                  :min-container-height="180"
                  :aspect-ratio="1"
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
                  <img :src="urlCroppedImgWeb" style="width:130px;height:130px;border:1px solid gray" alt="Cropped Image">
                </el-col>
                <el-col :span="18">
                  <p><b>web端封面 (1:1)</b></p>
                  <p>通过web端浏览文章页面（卡片视图）的用户，将看到此封面。</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <img :src="urlCroppedImgMobile" style="width:130px;height:56px;border:1px solid gray" alt="Cropped Image">
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
      urlSourceImg: '../../../static/upload/500.jpg',
      canvasCroppedImgWeb: null,
      canvasCroppedImgMobile: null,
      isCropForWeb: true,
      webRatio: 1,
      mobileRatio: 2.35,

      // 选中作为封面的图片名称
      selectedFileName: ''

    }
  },
  computed: {
    urlCroppedImgWeb () {
      return this.canvasCroppedImgWeb ? this.canvasCroppedImgWeb.toDataURL() : ""
    },
    urlCroppedImgMobile () {
      return this.canvasCroppedImgMobile ? this.canvasCroppedImgMobile.toDataURL() : ""
    }
  },
  watch: {
    isDialogShow (newValue, oldValue) {
      this.dialogVisible = newValue
    }
  },

  methods: {
    // 上传成功后调用的处理函数
    async handleSuccessUpload (response, file, fileList) {
      this.selectedFileName = response.fileName
      let res = await this.$axios.get(response.url, {responseType:'blob'})
      let blob = res.data
      const reader = new FileReader();
      let fileUrl = reader.readAsDataURL(blob)
      let component = this
      reader.onload=function(){
        component.urlSourceImg = this.result;
      }
    },

    // 关闭对话框时调用的处理函数
    handleDialogClose () {
      this.dialogVisible = false
      this.$emit('close', this.dialogVisible)
      this.activeStep = 0
      this.urlSourceImg = ''
      this.canvasCroppedImgWeb = null
      this.canvasCroppedImgMobile = null
    },

    nextStep () {
      if (this.activeStep >= 1) return
      this.activeStep++
    },
    lastStep () {
      this.activeStep=0
    },

    // 定义工具函数用于获取blob对象
    getBlob (canvasElem) {
      return new Promise((resolve, reject) => {
        canvasElem.toBlob( blob => resolve(blob) )
      })
    },


    // 完成封面设置（这也是整个对话框的目的），即点击‘完成’按钮后的处理函数
    async finishCoverSetting () {
      var blobWeb = await this.getBlob(this.canvasCroppedImgWeb)
      var blobMobile = await this.getBlob(this.canvasCroppedImgMobile)
      var formData = new FormData()
      await formData.append(
        'web',
        blobWeb,
        this.selectedFileName
      )
      formData.append(
        'mobile',
        blobMobile,
        this.selectedFileName
      )
      let config = {
        header: { "Content-Type": "multipart/form-data" },
        timeout: 30000
      }
      let {data} = await this.$axios.patch(
        '/api/upload/images',
        formData,
        config
      )
      this.$emit('success', data)
      this.handleDialogClose()
      this.$message.success('封面设置成功')
    },

    /* 封面图片选择、剪裁相关方法 */
    setCropperAspectRatio (ratio) {
      this.isCropForWeb =
        ratio === this.webRatio
        ? true
        : false
      this.$refs.cropper.setAspectRatio(ratio)
    },
    handleCrop () {
      let optsWeb = {
        width: 260,
        height: 260,
        imageSmoothingEnabled: true
      }
      let optsMobile = {
        width: 900,
        height: 383,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      }
      this.isCropForWeb
        ? this.canvasCroppedImgWeb = this.$refs.cropper.getCroppedCanvas(optsWeb)
        : this.canvasCroppedImgMobile = this.$refs.cropper.getCroppedCanvas(optsMobile)
    },

  }

}
</script>
