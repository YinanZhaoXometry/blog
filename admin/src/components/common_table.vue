<template>
  <el-table :data="dataList" style="width: 100%">
    <el-table-column
      v-for="(item, index) in config.columnList"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <template v-if="item.prop==='opts'">
        <div class="btn-box">
          <el-button
            v-for="(btn, index) in item.btnList"
            :key="index"
            :class="[btn.type=='text' && index!=(item.btnList.length-1)?'btn-divide-line':'']"
            :type="btn.type"
            :size="btn.size"
            @click="onClickBtn(btn.action)"
          >
            {{ btn.text }}
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    dataList: { type: Array },
    config: { type: Object, default: {}}
  },
  data () {
    return {
      // 示例数据
      // tableConfig: {
      //   columnList: [
      //     { label: '参数名', prop: 'date' },
      //     { label: '保护开关', prop: 'type' },
      //     { label: '报警值', prop: 'comment' },
      //     { label: 'DO1关联', prop: 'comment' },
      //     { label: 'DO2关联', prop: 'comment' },
      //     { label: '报警延时(s)', prop: 'comment' },
      //     { label: '操作', prop: 'opts', btnList: [
      //       { type: 'primary', text: '设置参数', size: 'mini' }
      //     ] }
      //   ]
      // },
      // tableData: [{
      //   date: '2016-05-04',
      //   type: '报警类型1',
      //   comment: '备注。。。'
      // }, {
      //   date: '2016-05-04',
      //   type: '报警类型1',
      //   comment: '备注。。。'
      // }, {
      //   date: '2016-05-01',
      //   type: '报警类型1',
      //   comment: '备注。。。'
      // }, {
      //   date: '2016-05-03',
      //   type: '报警类型1',
      //   comment: '备注。。。'
      // }]
    }
  },
  methods: {
    onClickBtn (action) {
      if (action) {
        this.$emit(action)
      }
    }
  }
}
</script>

<style scoped>
.btn-box {
  text-align:center;
  /* display: flex;
  justify-content: space-evenly; */
}
.btn-divide-line {
  position: relative;
}
.btn-divide-line:after {
  right: -6px;
  position: absolute;
  content: '';
  width: 1px;
  height: 10px;
  border-right: 1px solid #aaa;
}

</style>
