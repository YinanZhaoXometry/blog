<template>
  <section>
    <my-header class="header" />
    <div class="main-container">
      <div class="main">
        <transition name="fade" mode="out-in">
          <nuxt class="content" />
        </transition>
        <side-bar class="side-bar" />
      </div>
    </div>
    <my-footer class="footer" />
  </section>
</template>

<script>
import MyHeader from '~/components/public/Header.vue'
import MyFooter from '~/components/public/Footer.vue'
import SideBar from '~/components/public/SideBar.vue'

export default {
  components: {
    MyHeader,
    SideBar,
    MyFooter
  },

}
</script>

<style lang="less">

@import '../assets/less/layout.less';

</style>


