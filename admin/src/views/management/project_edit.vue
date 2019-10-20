<template>
  <div class="page-body bg-gray project-edit">
    <common-card :config="cardProjectEdit">
      <div style="padding-left:100px;">
        <my-form :groups="formGroups" style="width:700px;display:inline-block;" />
        <div style="width:700px">
          <div class="form-item">
          <label class="form-label">
            <span>项目检测设备</span>
          </label>
          <div class="form-input-block" style="flex-direction:column;">
            <p style="margin-bottom:10px;">
              <el-button type="primary" size="medium" @click="deviceDialogConfig.isShow=true">添加</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>检测设备1</span>
              <el-button type="text">删除</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>检测设备2</span>
              <el-button type="text">删除</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>检测设备3</span>
              <el-button type="text">删除</el-button>
            </p>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">
            <span>项目探测器</span>
          </label>
          <div class="form-input-block" style="flex-direction:column;">
            <p style="margin-bottom:10px;">
              <el-button type="primary" size="medium" @click="sensorDialogConfig.isShow=true">添加</el-button>
              <el-button size="medium">导入</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>探测器1</span>
              <el-button type="text">删除</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>探测器2</span>
              <el-button type="text">删除</el-button>
            </p>
            <p class="flex_space-between" style="width:200px;font-size:14px;color:#666;padding:0 10px;height:30px;">
              <span>探测器3</span>
              <el-button type="text">删除</el-button>
            </p>
          </div>
        </div>
        <div style="text-align:center;padding:20px 0;">
          <el-button
            class="dialog-footer-btn"
            @click="closeDialog"
            style="margin-right:20px;"
          >返 回</el-button>
          <el-button
            class="dialog-footer-btn"
            type="success"
            :disabled="submitLoading"
            :loading="submitLoading"
            @click="submit"
          >{{ submitLoading?'':'保 存' }}</el-button>
        </div>
        </div>
      </div>
    </common-card>
    <my-dialog :config="deviceDialogConfig">
      <my-form :groups="deviceFormGroups" />
    </my-dialog>
    <my-dialog :config="sensorDialogConfig">
      <my-form :groups="sensorFormGroups" />
    </my-dialog>
  </div>
</template>

<script>
import CommonCard from '@/components/common_card'
import MyDialog from '@/components/common_dialog'
import MyForm from '@/components/common_form'
export default {
  name: '',
  components: { CommonCard, MyDialog, MyForm },
  props: {},
  data () {
    return {
      submitLoading: false,
      cardProjectEdit: {
        title: '新增项目'
      },
      formGroups: [
        { title: '',  list: [
          { type: 'input', name:'model', title:'创建者', value: '', required: true },
          { type: 'input', name:'model', title:'项目ID', value: '', required: true },
          { type: 'date', name:'model', title:'建立时间', value: '', required: true },
          { type: 'input', name:'model', title:'项目名称', value: '', required: true },
          { type: 'select', name:'model', title:'项目区域', value: '', required: true },
          { type: 'input', name:'model', title:'业主单位', value: '', required: true },
          { type: 'input', name:'model', title:'项目负责人', value: '', required: true },
          { type: 'input', name:'model', title:'项目面积', value: '', required: true },
          { type: 'input', name:'model', title:'项目地址', value: '' },
          { type: 'select', name:'model', title:'2级代理商账号', value: '' },
          { type: 'select', name:'model', title:'3级代理商账号', value: '' },
          { type: 'select', name:'model', title:'项目巡查人员名单', value: '' },
          { type: 'textarea', name:'model', title:'项目备注信息', value: '' },
          { type: 'date', name:'model', title:'项目合同开始时间', value: '' },
          { type: 'date', name:'model', title:'项目合同结束时间', value: '' },
          { type: 'input', name:'model', title:'责任人电话', value: '' },
        ] },
      ],
      deviceDialogConfig: { title: '新增项目检测设备', isShow: false, width: '1000px' },
      deviceFormGroups: [
        { title: '',  list: [
          { type: 'input', name:'model', title:'创建者', value: '', required: true },
          { type: 'input', name:'model', title:'项目ID', value: '', required: true },
          { type: 'date', name:'model', title:'建立时间', value: '', required: true },
          { type: 'input', name:'model', title:'项目名称', value: '', required: true },
          { type: 'select', name:'model', title:'项目区域', value: '', required: true },
          { type: 'input', name:'model', title:'业主单位', value: '', required: true },
          { type: 'input', name:'model', title:'项目负责人', value: '', required: true },
          { type: 'input', name:'model', title:'项目面积', value: '', required: true },
          { type: 'input', name:'model', title:'项目地址', value: '' },
          { type: 'select', name:'model', title:'2级代理商账号', value: '' },
          { type: 'select', name:'model', title:'3级代理商账号', value: '' },
          { type: 'select', name:'model', title:'项目巡查人员名单', value: '' },
          { type: 'textarea', name:'model', title:'项目备注信息', value: '' },
          { type: 'date', name:'model', title:'项目合同开始时间', value: '' },
          { type: 'date', name:'model', title:'项目合同结束时间', value: '' },
          { type: 'input', name:'model', title:'责任人电话', value: '' },
        ] },
      ],
      sensorDialogConfig: { title: '新增项目探测器', isShow: false, width: '1000px' },
      sensorFormGroups: [
        { title: '',  list: [
          { type: 'input', name:'model', title:'探测器ID', value: '', required: true },
          { type: 'input', name:'model', title:'探测器型号', value: '', required: true },
          { type: 'input', name:'model', title:'位置信息', value: '', required: true },
          { type: 'input', name:'model', title:'报警阈值', value: '' },
          { type: 'input', name:'model', title:'报警延时', value: '' },
          { type: 'input', name:'model', title:'通道号', value: '' },
          { type: 'input', name:'model', title:'回路号', value: '' },
          { type: 'input', name:'model', title:'防火分区', value: '' },
          { type: 'input', name:'model', title:'单双门', value: '' }
        ] },
      ],
    }
  },
  computed: {},
  methods: {
    submit () {

    }
  }
}
</script>

<style scoped>
.form-label {
  font-size: 14px;
  color: #666;

}
</style>
