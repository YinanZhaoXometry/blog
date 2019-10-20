<template>
  <div class=" page-body bg-gray project">
    <div class="project-body">
      <!-- 快速工作台 -->
      <!-- <common-card :config="cardWorkbench" class="card-margin-bottom">
          <div class="card-workbench">
            <div class="card-workbench-row">
              <div style="display:flex;justify-content:space-evenly;width:100%;white-space:nowrap;">
                {{ name }}，欢迎登陆泰文物联网云平台监测系统！
                <ul class="links" >
                  <li class="link"><router-link to="/">当前在线设备:1</router-link></li>
                  <li class="link"><router-link to="/">当前失联设备:0</router-link></li>
                  <li class="link"><router-link to="/">当前设备在线率:100%</router-link></li>
                </ul>
              </div>
            </div>
            <div style="display:flex;justify-content:space-evenly;">
              <p class="card-workbench-row" style="max-width:300px;"><span>您有<i>2</i>处隐患需要处理</span><el-button type="text">查看</el-button></p>
              <p class="card-workbench-row" style="max-width:300px;"><span>您有<i>0</i>条任务需要完成</span><el-button type="text">查看</el-button></p>
            </div>
          </div>
        </common-card> -->
      <div class="card-stats-container">
        <card-stats v-for="(item, index) in cardStatsList" :key="index" class="card-stats-item" :config="item" />
      </div>

      <el-row :gutter="20" type="flex">
      <!-- <el-row :gutter="20" type="flex" style="align-items:stretch;"> -->
         <el-col :span="14" class="card-margin-bottom">
          <!-- 项目一览 -->
          <common-card :config="cardProjectInfo" style="height:100%;box-sizing: border-box;">
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
            <!-- <div class="project-device">
              <h4>下属设备及探测器</h4>
              <el-table :data="tableData" style="width: 100%" :span-method="objectSpanMethod">
                <el-table-column
                  label="设备"
                  width="330"
                >
                  <div slot-scope="scope" style="display:flex;">
                    <div style="width:30%;display:flex;align-items:center;">
                      <img style="width:100%;height:auto;" src="@/assets/img/device_disconnected.jpg" alt="">
                    </div>
                    <div style="flex:1;">
                      <p>41902140010004</p>
                      <p>ARCM300T-Z-2G</p>
                      <p>福建省三明市梅列区福清商会大厦20F</p>
                      <p>卡号898600E00914F1019223</p>
                      <p>信号强度31</p>
                    </div>
                  </div>
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="探测器ID"
                  width="100"
                />
                <el-table-column
                  prop="area"
                  label="探测器区域"
                  width="100"
                />
                <el-table-column
                  prop="place"
                  label="探测器位置"
                  width="100"
                />
                <el-table-column
                  prop="status"
                  label="探测器状态"
                />
              </el-table>
            </div> -->
          </common-card>
        </el-col>

        <el-col :span="10" class="card-margin-bottom">
          <!-- 本月隐患统计 -->
          <common-card :config="cardHiddenDanger" style="box-sizing: border-box;">
            <chart-line :data="chartData" :config="chartSettings" />
            <div class="card-alarm" style="justify-content:space-evenly;">
              <div class="card-alarm-item">
                <p class="card-alarm-item-top">故障总数</p>
                <p class="card-alarm-item-bottom">0</p>
              </div>
              <div class="card-alarm-item">
                <p class="card-alarm-item-top">报警总数</p>
                <p class="card-alarm-item-bottom">42</p>
              </div>
            </div>
          </common-card>
        </el-col>

      </el-row>

      <common-card :config="cardProjectDeviceInfo" style="height:100%;box-sizing: border-box;">
        <div class="project-device">
          <el-table :data="tableData" style="width: 100%" :span-method="objectSpanMethod">
            <el-table-column
              label="设备"
              min-width="330"
            >
              <div slot-scope="scope" style="display:flex;">
                <div style="width:30%;display:flex;align-items:center;">
                  <img style="height:100%;width:auto;" src="@/assets/img/device_disconnected.jpg" alt="">
                </div>
                <div style="flex:1;">
                  <p>41902140010004</p>
                  <p>ARCM300T-Z-2G</p>
                  <p>福建省三明市梅列区福清商会大厦20F</p>
                  <p>卡号898600E00914F1019223</p>
                  <p>信号强度31</p>
                </div>
              </div>
            </el-table-column>
            <el-table-column
              prop="id"
              label="探测器ID"
              min-width="100"
            />
            <el-table-column
              prop="area"
              label="探测器区域"
              min-width="100"
            />
            <el-table-column
              prop="place"
              label="探测器位置"
              min-width="100"
            />
            <el-table-column
              prop="status"
              label="探测器状态"
              min-width="100"
            />
          </el-table>
        </div>
      </common-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonCard from '@/components/common_card'
import ChartLine from '@/components/chart_line'
import CardStats from './comp_cardStats'
export default {
  name: 'Dashboard',
  components: { CommonCard, ChartLine, CardStats },
  data () {
    return {
      cardStatsList: [
        {
          bgColor: '#00c0ef', // light-blue
          title: '1',
          desc: '项目数',
          icon: 'iconfont icondevice'
        },
        {
          bgColor: '#00a65a', // green
          title: '3',
          desc: '物联网设备总数',
          icon: 'iconfont icondevice'
        },
        {
          bgColor: '#f39c12', // orange
          title: '6',
          desc: '物联网探测器总数',
          icon: 'iconfont icondevice'
        },
        {
          bgColor: '#dd4b39', // red
          title: '3',
          desc: '报警数',
          icon: 'iconfont iconbell'
        },
        {
          bgColor: '#01ff70', // lime
          title: '2',
          desc: '下级用户数量',
          icon: 'iconfont iconseeuser'
        },
        {
          bgColor: '#3c8dbc', // blue
          title: '99',
          desc: '操作日志',
          icon: 'iconfont iconkeyboard'
        }
      ],
      searchKW: '',
      cardWorkbench: {
        title: '快速工作台'
      },
      cardProjectInfo: {
        title: '项目一览'
      },
      cardProjectDeviceInfo: {
        title: '项目下属设备及探测器'
      },
      cardHiddenDanger: {
        title: '本月隐患统计'
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
        xAxisName: ['日期'],
        width: '100%'
      },

      tableData: [
        {
          device: '1',
          id: '1',
          area: '配电箱',
          place: '配电箱',
          status: '正常'
        },
        {
          device: '2',
          id: '1',
          area: '大闸机1',
          place: '配电箱',
          status: '正常'
        },
        {
          device: '2',
          id: '2',
          area: '大闸机2',
          place: '配电箱',
          status: '正常'
        },
        {
          device: '2',
          id: '3',
          area: '大闸机3',
          place: '配电箱',
          status: '正常'
        },
        {
          device: '2',
          id: '4',
          area: '大闸机4',
          place: '配电箱',
          status: '正常'
        },
        {
          device: '3',
          id: '1',
          area: '大闸机',
          status: '正常'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        console.log(row, column, rowIndex, columnIndex)

        if (row.device == '2' && row.id == '1') {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (row.device != '2') {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
