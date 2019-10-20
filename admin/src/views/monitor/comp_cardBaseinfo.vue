<template>
  <common-card :config="cardBaseInfo">
    <el-row class="card-baseinfo">
      <el-col :span="12" class="card-baseinfo-left">
        <div class="card-baseinfo-left-1">
          <img src="@/assets/img/status-normal.png" alt="status">
          <h4>表地址：1</h4>
        </div>
        <div class="card-baseinfo-left-2">
          <p><span class="title">状态：</span><span class="status">正常</span></p>
          <p><span class="title">所属区域：</span><span>电表</span></p>
          <p><span class="title">所属位置：</span><span>2</span></p>
          <p><span class="title">型号：</span><span>ARCM300T-Z-2G</span></p>
          <p><span class="title">备注：</span><span /></p>
        </div>
      </el-col>
      <el-col :span="6" class="card-baseinfo-middle">
        <div class="card-baseinfo-middle-1" />
        <div class="card-baseinfo-middle-2">
          <p>所属设备</p>
          <p class="code">71807272170004</p>
        </div>
      </el-col>
      <el-col :span="6" class="card-baseinfo-right">
        <div class="card-baseinfo-right-1" />
        <div class="card-baseinfo-right-2">
          <p>所属项目</p>
          <p class="code">浙江一正文化用品有限公司</p>
        </div>
      </el-col>
    </el-row>
  </common-card>
</template>
<script>
import CommonCard from '@/components/common_card'
export default {
  name: '',
  components: { CommonCard },
  props: {},
  data () {
    return {
      cardBaseInfo: { title: '探测器基本信息', width: '100%' }
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>
