<template>
  <ve-line :data="data" :settings="config" :width="config.width" />
</template>

<script>
export default {
  props: ['config', 'data'],
  data () {
    return {
    }
  }
}
</script>
