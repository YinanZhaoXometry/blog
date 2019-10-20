<template>
  <common-card :config="cardSwitches">
    <el-row class="card-switches" :gutter="20">
      <el-col class="card-switches-1" :span="6">
        <img class="card-switches-1_img" src="@/assets/img/switch.png" alt="switch">
      </el-col>
      <el-col class="card-switches-2" :span="6">
        <p>开</p>
        <p>保护开关</p>
      </el-col>
      <el-col class="card-switches-3" :span="6">
        <p><el-button type="primary">复位</el-button></p>
        <p><el-button>消音</el-button></p>
      </el-col>
      <el-col class="card-switches-4" :span="6">
        <p><el-button type="primary">分闸</el-button></p>
        <p><el-button>自检</el-button></p>
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
      cardSwitches: { title: '开关', width: '35%' }
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>
