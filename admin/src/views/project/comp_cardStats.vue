<template>
  <div class="card-stats" :style="{background: config.bgColor}">
    <div class="card-stats-body">
      <p class="card-stats-title">{{ config.title }}</p>
      <p class="card-stats-desc">{{ config.desc }}</p>
      <i :class="['card-stats-icon', config.icon] " />
    </div>
    <div class="card-stats-footer">
      更多 <i class="iconfont icon1202youjiantou" style="font-size:14px;" />
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
      default: {}
    }
  },
  data () {
    return {
      // config: {
      //   bgColor: '#00c0ef', // light-blue
      //   // bgColor: '#00a65a', // green
      //   // bgColor: '#f39c12', // orange
      //   // bgColor: '#dd4b39', // red
      //   // bgColor: '#01ff70', // lime
      //   // bgColor: '#3c8dbc', // blue
      //   title: '49',
      //   desc: '物联网设备总数',
      //   icon: 'iconfont iconbell'
      //   // icon: 'iconfont iconkeyboard'
      //   // icon: 'iconfont icondevice'
      //   // icon: 'iconfont iconseeuser'
      // }
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.card-stats{
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  position: relative;
  &-icon {
    transition: all .5s;
    position: absolute;
    right: 30px;
    top: 15px;
    font-size: 60px;
    color: #00000026;
  }
  &:hover &-icon{
    transform: scale(1.3);
  }
  &-body {
    padding: 35px 20px;
  }
  &-title {
    font-weight: bold;
    font-size: 34px;
    margin-bottom: 10px;
  }
  &-desc {
    font-size: 16px;
  }
  &-footer {
    font-size: 13px;
    letter-spacing: 1px;
    text-align: center;
    background:  #0000001a;
    color: 000;
    padding: 10px 0;
  }
  &-footer:hover {
    background: #00000026;
  }
}
</style>
