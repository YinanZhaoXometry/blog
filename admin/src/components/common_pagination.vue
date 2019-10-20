<template>
  <el-pagination
    class="common-pagination"
    background
    layout="prev, pager, next"
    :total="1000"
  />
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.common-pagination {
  text-align: center;
  padding: 15px 0;
}
</style>
