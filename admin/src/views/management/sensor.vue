<template>
  <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box">
          探测器档案表
          <div style="float:right;">
            <el-button size="small" type="success" @click="dialogConfig.isShow=true">新增</el-button>
            <el-button style="margin-left:5px;" size="small" type="default">导入</el-button>
          </div>
        </div>
        <search-form :config="searchConfig" style="padding:10px 0;" />
        <common-table :data-list="tableData" :config="tableConfig" />
        <common-pagination />
      </div>
    </common-card>
    <my-dialog :config="dialogConfig">
      <my-form :groups="formGroups" />
    </my-dialog>
  </div>
</template>

<script>
import CommonCard from '@/components/common_card'
import SearchForm from '@/components/common_searchForm'
import CommonTable from '@/components/common_table'
import CommonPagination from '@/components/common_pagination'
import MyDialog from '@/components/common_dialog'
import MyForm from '@/components/common_form'
export default {
  name: '',
  components: { CommonCard, SearchForm, CommonTable, CommonPagination, MyDialog, MyForm },
  props: {},
  data () {
    return {
      formGroups: [
        { title: '探测器基本信息',  list: [
          { type: 'input', name:'model', title:'探测器ID', value: '', required: true },
          { type: 'date', name:'model', title:'建立时间', value: '', required: true },
          { type: 'input', name:'model', title:'探测器型号', value: '', required: true },
          { type: 'input', name:'model', title:'探测器类型', value: '', required: true },
          { type: 'upload', name:'model', title:'探测器图片', value: '', required: true },
          { type: 'input', name:'model', title:'数据通道说明', value: '', required: true },
          { type: 'input', name:'model', title:'接口类型', value: '', required: true },
          { type: 'input', name:'model', title:'通讯协议', value: '', required: true },
          { type: 'input', name:'model', title:'生产厂家', value: '' },
          { type: 'input', name:'model', title:'功能描述', value: '' },
          { type: 'input', name:'model', title:'安装方式', value: '' },
          { type: 'textarea', name:'model', title:'备注信息', value: '' },
        ] },
        { title: '探测器数据通道',  list: [
          { type: 'input', name:'model', title:'剩余电流', value: '' },
          { type: 'input', name:'model', title:'温度', value: '' },
          { type: 'input', name:'model', title:'电压', value: '' },
          { type: 'input', name:'model', title:'电流', value: '' },
          { type: 'input', name:'model', title:'三相电压', value: '' },
          { type: 'input', name:'model', title:'三相电流', value: '' },
          { type: 'input', name:'model', title:'单相电压', value: '' },
          { type: 'input', name:'model', title:'单相电流', value: '' },
          { type: 'input', name:'model', title:'压力值', value: '' },
          { type: 'input', name:'model', title:'液位值', value: '' },
          { type: 'input', name:'model', title:'百分比数字', value: '' },
          { type: 'input', name:'model', title:'门', value: '' },
          { type: 'switch', name:'model', title:'门常态(开/闭)', value: '' },
          { type: 'switch', name:'model', title:'开关量(有/无)', value: '' },

        ] },
      ],
      dialogConfig: { title: '新增探测器', isShow: false, width: '1000px' },
      searchConfig: {
        showMore: false,
        seaching: false, // 是否正在搜索中
        list: [
          [
            { type: 'input', title: '探测器型号', value: '' },
            { type: 'select', title:'探测器类型', value: '', options: [] },
            { type: 'select', title:'接口类型', value: '' },
            { type: 'btns' }
          ]
        ]
      },
      tableConfig: {
        columnList: [
          { label: '序号', prop: 'date' },
          { label: '探测器ID', prop: 'type' },
          { label: '建立时间', prop: 'comment' },
          { label: '探测器型号', prop: 'comment' },
          { label: '探测器类型', prop: 'comment' },
          { label: '探测器图片', prop: 'comment' },
          { label: '数据通道说明', prop: 'comment' },
          { label: '接口类型', prop: 'comment' },
          { label: '通讯协议', prop: 'comment' },
          { label: '操作', prop: 'opts', btnList: [
            { type: 'text', text: '查看', size: 'mini' },
            { type: 'text', text: '编辑', size: 'mini' },
            { type: 'text', text: '启动', size: 'mini' },
            { type: 'text', text: '禁止', size: 'mini' },
            { type: 'text', text: '删除', size: 'mini' }
          ] }
        ]
      },
      tableData: [{
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
      }]
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
</style>
