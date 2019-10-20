<template>
  <div class="card" :style="{width: config.width?config.width:'100%'}">
    <div v-if="config.title" class="card-header">
      <i class="card-header-icon el-icon-info" />
      <h4 class="card-header-title">{{ config.title }}</h4>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    config: {
      type: Object,
      default() {
        return { title: '' }
      }
    }
  },
  data () {
    return {
      // 数据示例
      // cardStats: {
      //   title: '本月统计'
      // },
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.card {
  background: #fff;
  border-radius: 0 0 5px 5px;
}
.card-header {
  border-radius: 5px 5px 0 0;
  background: linear-gradient(to bottom right, #3498ea , #3fc9d5);
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  display: flex;
  color: #fff;
  &-icon {
    line-height: 30px;
    margin-right: 5px;
  }
  &-title {
  }
}
.card-body {
  padding: 20px;
}
</style>
