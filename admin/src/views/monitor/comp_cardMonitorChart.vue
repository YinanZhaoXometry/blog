<template>
  <common-card :config="cardMonitorChart">
    <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(tab, index) in tabList"
        :key="index"
        :lazy="true"
        :label="tab.label"
        :name="tab.name"
      >
        <b>今日数据</b>
        <div style="position:absolute;right:0;;z-index:1000;top:0;">
          <el-date-picker
            v-model="value1"
            type="daterange"
            placeholder="选择日期"
          />
        </div>
        <chart-line :data="getChartData(index)" :config="{ yAxisName: [tabList[index].label] }" />
      </el-tab-pane>
    </el-tabs>
  </common-card>
</template>
<script>
import CommonCard from '@/components/common_card'
import ChartLine from '@/components/chart_line'
export default {
  name: '',
  components: { CommonCard, ChartLine },
  props: {},
  data () {
    return {
      value1: '',
      cardMonitorChart: { title: '实时数据' },
      activeTabName: '剩余电流',
      tabList: [
        { label: '剩余电流', name: '剩余电流' },
        { label: '温度1', name: '温度1' },
        { label: '温度2', name: '温度2' },
        { label: '温度3', name: '温度3' },
        { label: '温度4', name: '温度4' },
        { label: 'A相电压(V)', name: 'A相电压' },
        { label: 'B相电压(V)', name: 'B相电压' },
        { label: 'C相电压(V)', name: 'C相电压' },
        { label: 'A相电流(A)', name: 'A相电流' },
        { label: 'B相电流(A)', name: 'B相电流' },
        { label: 'C相电流(A)', name: 'C相电流' },
        { label: '有功电能(KWH)', name: '有功电能' },
        { label: 'AB相线电压(V)', name: 'AB相线电压' },
        { label: 'BC相线电压(V)', name: 'BC相线电压' },
        { label: 'AC相线电压(V)', name: 'AC相线电压' },
        { label: '三项电压(V)', name: '三项电压' },
        { label: '三项电流(A)', name: '三项电流' }
      ],
      chartData0: {
        columns: ['日期', '今日', '昨日'],
        rows: [
          { '日期': '6/1', '今日': 2, '昨日': 2 },
          { '日期': '6/2', '今日': 4, '昨日': 5 },
          { '日期': '6/3', '今日': 3, '昨日': 2 },
          { '日期': '6/4', '今日': 7, '昨日': 6 },
          { '日期': '6/5', '今日': 5, '昨日': 4 },
          { '日期': '6/6', '今日': 2, '昨日': 2 },
          { '日期': '6/7', '今日': 3, '昨日': 2 },
          { '日期': '6/8', '今日': 1, '昨日': 1 },
          { '日期': '6/9', '今日': 2, '昨日': 2 },
          { '日期': '6/10', '今日': 3, '昨日': 2 },
          { '日期': '6/11', '今日': 8, '昨日': 2 }
        ]
      },
      chartData1: {
        columns: ['日期', '今日', '昨日'],
        rows: [
          { '日期': '6/1', '今日': 1, '昨日': 2 },
          { '日期': '6/2', '今日': 2, '昨日': 5 },
          { '日期': '6/3', '今日': 1, '昨日': 2 },
          { '日期': '6/4', '今日': 1, '昨日': 6 },
          { '日期': '6/5', '今日': 2, '昨日': 4 },
          { '日期': '6/6', '今日': 1, '昨日': 2 },
          { '日期': '6/7', '今日': 3, '昨日': 2 },
          { '日期': '6/8', '今日': 5, '昨日': 1 },
          { '日期': '6/9', '今日': 6, '昨日': 2 },
          { '日期': '6/10', '今日': 7, '昨日': 2 },
          { '日期': '6/11', '今日': 2, '昨日': 2 }
        ]
      },
      chartData2: {
        columns: ['日期', '今日', '昨日'],
        rows: [
          { '日期': '6/1', '今日': 2, '昨日': 2 },
          { '日期': '6/2', '今日': 4, '昨日': 5 },
          { '日期': '6/3', '今日': 3, '昨日': 2 },
          { '日期': '6/4', '今日': 7, '昨日': 6 },
          { '日期': '6/5', '今日': 5, '昨日': 4 },
          { '日期': '6/6', '今日': 2, '昨日': 2 },
          { '日期': '6/7', '今日': 3, '昨日': 2 },
          { '日期': '6/8', '今日': 1, '昨日': 1 },
          { '日期': '6/9', '今日': 2, '昨日': 2 },
          { '日期': '6/10', '今日': 3, '昨日': 2 },
          { '日期': '6/11', '今日': 8, '昨日': 2 }
        ]
      },
      chartData3: {
        columns: ['日期', '今日', '昨日'],
        rows: [
          { '日期': '6/1', '今日': 2, '昨日': 2 },
          { '日期': '6/2', '今日': 4, '昨日': 5 },
          { '日期': '6/3', '今日': 3, '昨日': 2 },
          { '日期': '6/4', '今日': 7, '昨日': 6 },
          { '日期': '6/5', '今日': 5, '昨日': 4 },
          { '日期': '6/6', '今日': 2, '昨日': 2 },
          { '日期': '6/7', '今日': 3, '昨日': 2 },
          { '日期': '6/8', '今日': 1, '昨日': 1 },
          { '日期': '6/9', '今日': 2, '昨日': 2 },
          { '日期': '6/10', '今日': 3, '昨日': 2 },
          { '日期': '6/11', '今日': 8, '昨日': 2 }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getChartData (index) {
      return this['chartData' + index]
    }
  }
}
</script>
<style scoped>
</style>
