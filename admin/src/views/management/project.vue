<template>
  <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box">
          项目列表
          <div style="float:right;">
            <el-button size="small" type="success" @click="goPage('/management/project/edit')">新增</el-button>
          </div>
        </div>
        <search-form :config="searchConfig" style="padding:10px 0;" />
        <common-table :data-list="tableData" :config="tableConfig" @goDetailPage="goDetailPage" />
        <common-pagination />
      </div>
    </common-card>
  </div>
</template>

<script>
import CommonCard from '@/components/common_card'
import SearchForm from '@/components/common_searchForm'
import CommonTable from '@/components/common_table'
import CommonPagination from '@/components/common_pagination'
export default {
  name: '',
  components: { CommonCard, SearchForm, CommonTable, CommonPagination },
  props: {},
  data () {
    return {
      searchConfig: {
        showMore: false,
        seaching: false, // 是否正在搜索中
        list: [
          [
            { type: 'input', title: '项目名称', value: '' },
            { type: 'select', title:'项目区域', value: '', options: [] },
            { type: 'input', title: '代理商', value: '' },
            { type: 'btns' }
          ],
          [
            { type: 'dateTo', title:'创建时间', value: '' }
          ]
        ]
      },
      tableConfig: {
        columnList: [
          { label: '序号', prop: 'date' },
          { label: '项目ID', prop: 'type' },
          { label: '建立时间', prop: 'comment' },
          { label: '项目名称', prop: 'comment' },
          { label: '项目区域', prop: 'comment' },
          { label: '业主单位', prop: 'comment' },
          { label: '项目负责人', prop: 'comment' },
          { label: '项目面积', prop: 'comment' },
          { label: '设备数量', prop: 'comment' },
          { label: '探测器数量', prop: 'comment' },
          { label: '2级代理商账号', prop: 'comment' },
          { label: '操作', prop: 'opts', btnList: [
            { type: 'text', text: '查看', size: 'mini', action: 'goDetailPage' },
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
    goPage (url) {
      this.$router.push(url)
    },
    goDetailPage () {
      this.$router.push('/management/project/detail')
    }

  }
}
</script>

<style scoped>
</style>
