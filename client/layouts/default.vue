<template>
  <section>
    <navbar class="sticky" />
    <transition name="fade" mode="out-in">
      <nuxt class="content" />
    </transition>
    <side-bar class="side-bar" />
    <my-footer />
  </section>
</template>

<script>
import Navbar from '~/components/public/Navbar.vue'
import MyFooter from '~/components/public/Footer.vue'
import SideBar from '~/components/public/SideBar.vue'

export default {
  components: {
    Navbar,
    SideBar,
    MyFooter
  },

}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.content, .side-bar {
  margin-top: 130px;
  /* padding: 130px 0 30px 0; */
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index:3000;
}



</style>


