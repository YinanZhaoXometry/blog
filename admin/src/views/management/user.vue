<template>
  <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box">
          用户管理表
          <div style="float:right;">
            <el-button size="small" type="success" @click="dialogConfig.isShow=true">新增用户</el-button>
          </div>
        </div>
        <search-form :config="searchConfig" style="padding:10px 0;" />
        <common-table :data-list="tableData" :config="tableConfig" @goDetailPage="goDetailPage" />
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
          { type: 'input', name:'model', title:'账号', value: '', required: true },
          { type: 'input', name:'model', title:'密码', value: '', required: true },
          { type: 'select', name:'model', title:'地区', value: '' },
          { type: 'select', name:'model', title:'账号等级', value: '' },
          { type: 'date', name:'model', title:'账号到期时间', value: '' },
          { type: 'select', name:'model', title:'所属项目', value: '' },
        ] }
      ],
      dialogConfig: { title: '新增用户', isShow: false, width: '1000px' },
      searchConfig: {
        showMore: false,
        seaching: false, // 是否正在搜索中
        list: [
          [
            { type: 'input', title: '姓名', value: '' },
            { type: 'select', title:'地区', value: '', options: [] },
            { type: 'select', title:'创建者', value: '', options: [] },
            { type: 'btns' }
          ],
          [
            { type: 'select', title:'账号等级', value: '', options: [] },
            { type: 'dateTo', title:'创建时间', value: '' }

          ]
        ]
      },
      tableConfig: {
        columnList: [
          { label: '序号', prop: 'date' },
          { label: '账号名', prop: 'type' },
          { label: '姓名', prop: 'comment' },
          { label: '单位', prop: 'comment' },
          { label: '地区', prop: 'comment' },
          { label: '创建时间', prop: 'comment' },
          { label: '创建者', prop: 'comment' },
          { label: '账号等级', prop: 'comment' },
          { label: '到期时间', prop: 'comment' },
          { label: '操作', prop: 'opts', btnList: [
            { type: 'text', text: '查看', size: 'mini', action: 'goDetailPage' },
            { type: 'text', text: '编辑', size: 'mini' },
            { type: 'text', text: '停用', size: 'mini' }
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
  methods: {
    goDetailPage () {
      this.$router.push('/management/user/detail')
    }
  }
}
</script>

<style scoped>
</style>
