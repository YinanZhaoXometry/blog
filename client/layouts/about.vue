<template>
  <section>
    <my-header />
    <div class="about-container-content">
      <nuxt />
    </div>
    <my-footer class="about-footer" />
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
