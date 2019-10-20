<template>
  <common-card :config="cardMonitorGrid">
    <div class="card-monitor-grid">
      <el-row
        v-for="(row, rowIndex) in gridRowList"
        :key="rowIndex"
        class="card-monitor-grid-row"
        :gutter="10"
      >
        <el-col v-for="(item, index) in row" :key="index" :span="4">
          <div class="card-monitor-grid-item">
            <div class="card-monitor-grid-item-1">
              <i :class="['iconfont', item.icon]" />
            </div>
            <div class="card-monitor-grid-item-2">
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
      cardMonitorGrid: { title: '数据监控' },
      gridItemList: [
        { title: '15 mA', desc: '剩余电流', icon: 'icondian1' },
        { title: '24.7 ℃', desc: '温度1', icon: 'iconwendu' },
        { title: '24.7 ℃', desc: '温度2', icon: 'iconwendu' },
        { title: '24.7 ℃', desc: '温度3', icon: 'iconwendu' },
        { title: '24.7 ℃', desc: '温度4', icon: 'iconwendu' },
        { title: '关', desc: '开关量输入1', icon: 'icondian' },
        { title: '关', desc: '开关量输入2', icon: 'icondian' },
        { title: '关', desc: '开关量输入3', icon: 'icondian' },
        { title: '关', desc: '开关量输入4', icon: 'icondian' },
        { title: '开', desc: '开关量输出1', icon: 'icondian' },
        { title: '开', desc: '开关量输出2', icon: 'icondian' },
        { title: '226.5 V', desc: 'A相电压(V)', icon: 'icondianya' },
        { title: '225.8 V', desc: 'B相电压(V)', icon: 'icondianya' },
        { title: '226 V', desc: 'C相电压(V)', icon: 'icondianya' },
        { title: '0.87 A', desc: 'A相电流(A)', icon: 'icondianliu' },
        { title: '0.96 A', desc: 'B相电流(A)', icon: 'icondianliu' },
        { title: '0 A', desc: 'C相电流(A)', icon: 'icondianliu' },
        { title: '1.7万 KWH', desc: '有功电能(KWH)', icon: 'icongongshuai' }
      ],
      statsTabNameList: [
        '', '', '', ''
      ]
    }
  },
  computed: {
    gridRowList () {
      const rowSize = 6; let rowCount = 1; const rowList = []
      const totalRows = Math.ceil(this.gridItemList.length / rowSize)
      while (rowCount <= totalRows) {
        rowList.push(this.gridItemList.slice((rowCount - 1) * rowSize, rowSize * rowCount))
        rowCount++
      }
      console.log('rowList', rowList)
      return rowList
    }
  },
  methods: {}
}
</script>
<style scoped>
.card-monitor-grid-item-2 .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card-monitor-grid-item-2 .desc {
  /* min-width: 100px; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
