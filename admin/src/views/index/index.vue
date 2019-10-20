<template>
  <div class="dashboard-container page-body bg-gray">
    <div class="dashboard-body">
      <div class="dashboard-body-left">
        <common-card :config="cardWorkbench" class="card-margin-bottom">
          <div class="card-workbench">
            <div class="card-workbench-row">
              <div style="display:flex;justify-content:center;width:100%;white-space:nowrap;">
                {{ name }}，欢迎登陆泰文物联网云平台监测系统！
                <ul class="links">
                  <li class="link"><router-link to="/">当前在线设备:1</router-link></li>
                  <li class="link"><router-link to="/">当前失联设备:0</router-link></li>
                  <li class="link"><router-link to="/">当前设备在线率:100%</router-link></li>
                </ul>
              </div>
            </div>
            <div style="display:flex;justify-content:space-evenly;margin-top:20px;">
              <p class="card-workbench-row" style="max-width:300px;"><span>您有<i>2</i>处隐患需要处理</span><el-button type="text">查看</el-button></p>
              <p class="card-workbench-row" style="max-width:300px;"><span>您有<i>0</i>条任务需要完成</span><el-button type="text">查看</el-button></p>
            </div>
          </div>
        </common-card>
        <common-card :config="cardProjectInfo" class="card-margin-bottom">
          <div class="project-info">
            <div class="project-info-menu">
              <div class="project-info-menu-search">
                <el-input v-model="searchKW" placeholder="请输入内容" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" />
                </el-input>
              </div>
              <ul class="project-info-menu-content">
                <li v-for="index in 8" :key="index" class="project-info-menu-item">
                  <p class="project-info-menu-item-title">万达购物中心</p>
                  <p class="project-info-menu-item-num">201806260001</p>
                  <i class="project-info-menu-item-arrow el-icon-arrow-right" />
                </li>
              </ul>
            </div>
            <div class="project-info-content">
              <div class="project-info-content_row title">
                盈盛汽车配件有限公司智慧用电项目
              </div>
              <div v-for="index in 8" :key="index" class="project-info-content_row">
                <p class="project-info-content_row-left">
                  <i class="el-icon-info" style="margin-right:10px;" />
                  <span>项目识别号：</span>
                </p>
                <p class="project-info-content_row-right">
                  <span>1</span><el-button type="text" style="margin-left:20px;">查看</el-button>
                </p>
              </div>
            </div>
          </div>
        </common-card>

        <!-- 设备位置分布 -->
        <common-card :config="cardDeviceMap" class="card-margin-bottom">
          <device-map style="height:500px;" />
        </common-card>

        <common-card :config="cardHiddenDanger">
          <chart-line :data="chartData" :config="chartSettings" />
        </common-card>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonCard from '@/components/common_card'
import ChartLine from '@/components/chart_line'
import DeviceMap from './comp_deviceMap'
export default {
  name: 'Dashboard',
  components: { CommonCard, ChartLine, DeviceMap },
  data () {
    return {
      searchKW: '',
      cardWorkbench: {
        title: '快速工作台'
      },
      cardProjectInfo: {
        title: '项目信息'
      },
      cardDeviceMap: {
        title: '设备位置分布'
      },
      cardHiddenDanger: {
        title: '本月隐患统计'
      },
      cardStats: {
        title: '本月统计'
      },
      chartData: {
        columns: ['日期', '隐患统计'],
        rows: [
          { '日期': '6/1', '隐患统计': 1 },
          { '日期': '6/2', '隐患统计': 2 },
          { '日期': '6/3', '隐患统计': 5 },
          { '日期': '6/4', '隐患统计': 1 },
          { '日期': '6/5', '隐患统计': 0 },
          { '日期': '6/6', '隐患统计': 3 },
          { '日期': '6/7', '隐患统计': 2 },
          { '日期': '6/8', '隐患统计': 5 },
          { '日期': '6/9', '隐患统计': 1 },
          { '日期': '6/10', '隐患统计': 3 }
        ]
      },
      chartSettings: {
        yAxisName: ['单位(个)'],
        xAxisName: ['日期']
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
