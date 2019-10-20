<template>
  <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box">
          检测（主机）设备档案表
          <el-button style="float:right;" size="small" type="success" @click="dialogConfig.isShow=true">新增设备</el-button></div>
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
        { title: '',  list: [
          { type: 'input', name:'model', title:'检测设备ID', value: '', required: true },
          { type: 'date', name:'model', title:'建立时间', value: '', required: true },
          { type: 'input', name:'model', title:'设备型号', value: '', required: true },
          { type: 'input', name:'model', title:'设备类型', value: '', required: true },
          { type: 'input', name:'model', title:'系统分类', value: '', required: true },
          { type: 'input', name:'model', title:'生成厂家', value: '', required: true },
          { type: 'input', name:'model', title:'通讯方式', value: '', required: true },
          { type: 'upload', name:'model', title:'图片', value: '', required: true },
          { type: 'textarea', name:'model', title:'备注信息', value: '' },
        ] },
      ],
      dialogConfig: { title: '新增设备', isShow: false, width: '1000px' },
      searchConfig: {
        showMore: false,
        seaching: false, // 是否正在搜索中
        list: [
          [
            { type: 'input', title: '设备型号', value: '' },
            { type: 'select', title:'设备类型', value: '', options: [] },
            { type: 'select', title:'系统分类', value: '' },
            { type: 'btns' }
          ]
        ]
      },
      tableConfig: {
        columnList: [
          { label: '序号', prop: 'date' },
          { label: '检测设备ID', prop: 'type' },
          { label: '建立时间', prop: 'comment' },
          { label: '检测设备型号', prop: 'comment' },
          { label: '检测设备类型', prop: 'comment' },
          { label: '检测设备分类', prop: 'comment' },
          { label: '生产厂商', prop: 'comment' },
          { label: '通讯方式', prop: 'comment' },
          { label: '图片', prop: 'comment' },
          { label: '操作', prop: 'opts', btnList: [
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
