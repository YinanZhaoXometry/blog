<template>
  <section>
    <my-header />
    <div class="container-content">
      <nuxt class="content" />
    </div>
    <my-footer class="footer" />
  </section>
</template>

<script>
import MyHeader from '~/components/public/Header.vue'
import MyFooter from '~/components/public/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style scoped>
.container-content {
  position: relative;
  top: 60px;
  width: 100%;
}
.footer {
  margin-top: 60px;
}

</style>
