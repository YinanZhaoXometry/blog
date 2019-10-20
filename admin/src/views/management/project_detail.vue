<template>
   <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box" style="margin-bottom:20px;">
          项目详情
          <div style="float:right;margin-right:20px;">
            <el-button size="medium" type="default" @click="goBack">关闭</el-button>
          </div>
        </div>
        <div style="text-align:center;">
          <my-detail :groups="detailGroups" style="width:650px;display:inline-block;" />
        </div>
      </div>
    </common-card>
  </div>
</template>

<script>
import CommonCard from '@/components/common_card'
import MyDetail from '@/components/common_detail'
export default {
  name: '',
  components: { CommonCard, MyDetail },
  props: {},
  data () {
    return {
      detailGroups: [
        { title: '',  list: [
          { type: 'text', title:'创建者', value: 'zhao123123', btnList: [{text:'修改密码', type:'text'}] },
          { type: 'text', title:'项目ID', value: '2019年3月2日 星期六' },
          { type: 'text', title:'建立时间', value: 'Twman/平台管理员' },
          { type: 'text', title:'项目名称', value: '（缺省图片）', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'项目区域', value: '何碧晨', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'业主单位', value: '18210102312', btnList: [{text:'绑修改定', type:'text'}] },
          { type: 'text', title:'项目负责人', value: '江苏省消防服务公司', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'项目面积', value: '江苏省南京市历山路23号', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'设备数量', value: '3  个', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'探测器数量', value: '3  个', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'2级代理商账号', value: '3  个', btnList: [{text:'修改', type:'text'}] },
          { type: 'divider' },
          { type: 'text', title:'项目地址', value: '中国/江苏省', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'3级代理商账号', value: '2级/省级代理', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'项目巡查人员名单', value: '2020年5月20日 星期三', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'项目备注信息', value: '2020年5月20日 星期三', btnList: [{text:'修改', type:'text'}] },
          { type: 'divider' },
          { type: 'text', title:'项目合同开始时间', value: '2019年8月3日 13:34' },
          { type: 'text', title:'项目合同结束时间', value: '2019年8月3日 13:34' },
          { type: 'text', title:'责任人电话', value: '2019年8月3日 13:34' },
          { type: 'text', title:'最新编辑人员', value: '2019年8月3日 13:34' },
          { type: 'text', title:'最新编辑时间', value: '2019年8月3日 13:34' },
        ] },
      ],
    }
  },
  computed: {},
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
</style>
