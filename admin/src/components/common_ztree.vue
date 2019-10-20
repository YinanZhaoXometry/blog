<template>
  <tree
    :setting="setting"
    :nodes="nodes"
    @onClick="onClick"
    @onCheck="onCheck"
    @onCreated="handleCreated"
  />
</template>
<script>
import tree from 'vue-giant-tree'
import PCAData from '@/assets/mockData/pca-code.json'
export default {
  name: '',
  components: { tree },
  data () {
    return {
      showIndex: 0,
      setting: {
        check: {
          enable: false
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pid'
          }
        }
      }
      // 	nodes: [
      //     { id:1, pid:0, name:"随意勾选 1"},
      //     { id:11, pid:1, name:"随意勾选 1-1"},
      //     { id:111, pid:11, name:"随意勾选 1-1-1"},
      //     { id:112, pid:11, name:"随意勾选 1-1-2"},
      //     { id:12, pid:1, name:"随意勾选 1-2"},
      //     { id:121, pid:12, name:"随意勾选 1-2-1"},
      //     { id:122, pid:12, name:"随意勾选 1-2-2"},
      //     { id:2, pid:0, name:"随意勾选 2", checked:true},
      //     { id:21, pid:2, name:"随意勾选 2-1"},
      //     { id:22, pid:2, name:"随意勾选 2-2"},
      //     { id:221, pid:22, name:"随意勾选 2-2-1", checked:true},
      //     { id:222, pid:22, name:"随意勾选 2-2-2"},
      //     { id:23, pid:2, name:"随意勾选 2-3"},
      //     { id:3, pid:0, name:"随意勾选 2", checked:true},
      // ]
    }
  },
  computed: {
    nodes () {
      return PCAData
    }
  },
  methods: {
    onClick: function (evt, treeId, treeNode) {
      // 点击事件
      console.log(evt.type, treeNode)
    },
    onCheck: function (evt, treeId, treeNode) {
      // 选中事件
      console.log(evt.type, treeNode)
    },
    handleCreated: function(ztreeObj) {
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[0], true)
    },
    update: function () {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0
    }
  }
}
</script>
<style>
.ztree .button {
  box-sizing: content-box !important;
}
</style>
