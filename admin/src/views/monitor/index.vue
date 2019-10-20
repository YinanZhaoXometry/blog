<template>
  <div class="page-body bg-gray flex-column">
    <div class="monitor bg-white">
      <div class="monitor-content bg-gray">
        <div class="monitor-content-row">
          <card-baseinfo />
          <!-- <card-switches /> -->
        </div>
        <div class="monitor-content-row">
          <card-monitor-grid />
        </div>
        <div class="monitor-content-row">
          <card-monitor-chart />
        </div>
        <div class="monitor-content-row">
          <common-card :config="cardAlarmTable">
            <common-table :data-list="alarmTableData" :config="alarmTableConfig" />
          </common-card>
          <common-card :config="cardHistory" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardBaseinfo from './comp_cardBaseinfo'
// import CardSwitches from './comp_cardSwitches'
import CardMonitorGrid from './comp_cardMonitorGrid'
import CardMonitorChart from './comp_cardMonitorChart'
import CommonCard from '@/components/common_card'
import CommonTable from '@/components/common_table'
export default {
  name: '',
  components: { CardBaseinfo, CommonCard, CommonTable, CardMonitorGrid, CardMonitorChart },
  props: {},
  data () {
    return {
      searchKW: '',
      cardAlarmTable: { title: '报警信息', width: '48%' },
      cardHistory: { title: '历史参数', width: '48%' },
      cardParamsTable: { title: '参数设置' },
      alarmTableConfig: {
        columnList: [
          { label: '时间', prop: 'date' },
          { label: '报警类型', prop: 'type' },
          { label: '备注', prop: 'comment' }
        ]
      },
      alarmTableData: [{
        date: '2016-05-04',
        type: '报警类型1',
        comment: '备注。。。'
      }, {
        date: '2016-05-04',
        type: '报警类型1',
        comment: '备注。。。'
      }, {
        date: '2016-05-01',
        type: '报警类型1',
        comment: '备注。。。'
      }, {
        date: '2016-05-03',
        type: '报警类型1',
        comment: '备注。。。'
      }],
      paramsTableConfig: {
        columnList: [
          { label: '参数名', prop: 'date' },
          { label: '保护开关', prop: 'type' },
          { label: '报警值', prop: 'comment' },
          { label: 'DO1关联', prop: 'comment' },
          { label: 'DO2关联', prop: 'comment' },
          { label: '报警延时(s)', prop: 'comment' },
          { label: '操作', prop: 'opts', btnList: [
            { type: 'primary', text: '设置参数', size: 'mini' }
          ] }
        ]
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>
