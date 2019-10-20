<template>
   <div class="page-body bg-gray">
    <common-card>
      <div class="page-body-content">
        <div class="table-title-box" style="margin-bottom:20px;">
          用户信息详情
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
          { type: 'text', title:'账号', value: 'zhao123123', btnList: [{text:'修改密码', type:'text'}] },
          { type: 'text', title:'创建时间', value: '2019年3月2日 星期六' },
          { type: 'text', title:'创建者', value: 'Twman/平台管理员' },
          { type: 'text', title:'头像', value: '（缺省图片）', btnList: [{text:'修改', type:'text'}] },
          { type: 'divider' },
          { type: 'text', title:'姓名', value: '何碧晨', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'手机', value: '18210102312', btnList: [{text:'绑定', type:'text'}, {text:'解绑', type:'text'}] },
          { type: 'text', title:'单位', value: '江苏省消防服务公司', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'详细地址', value: '江苏省南京市历山路23号', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'所属项目数', value: '3  个' },
          { type: 'divider' },
          { type: 'text', title:'地区', value: '中国/江苏省', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'账号等级', value: '2级/省级代理', btnList: [{text:'修改', type:'text'}] },
          { type: 'text', title:'账号到期时间', value: '2020年5月20日 星期三', btnList: [{text:'修改', type:'text'}] },
          { type: 'divider' },
          { type: 'text', title:'最近登录', value: '2019年8月3日 13:34', btnList: [{text:'登录历史', type:'text'}] },
          { type: 'text', title:'版本号', value: 'V1.3.001' },
          { type: 'text', title:'备注信息', value: '2018年成为泰文代理商' },
          { type: 'text', title:'上级账户(账号/单位/姓名)', value: 'twman/泰文公司/张天元' },
          { type: 'text', title:'下级账户(账号/单位/姓名)', value: 'SSM1/江苏南京万达/李文文' },
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
