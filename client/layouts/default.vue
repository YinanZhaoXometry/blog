<template>
  <section>
    <banner class="banner" />
    <navbar id="navbar" :class="{sticky: isSticky}" />
    <transition name="fade" mode="out-in">
      <nuxt class="content" />
    </transition>
    <my-footer />
  </section>
</template>

<script>
import Banner from '~/components/public/Banner.vue'
import Navbar from '~/components/public/Navbar.vue'
import MyFooter from '~/components/public/Footer.vue'

export default {
  components: {
    Banner,
    Navbar,
    MyFooter
  },
  data () {
    return {
      isSticky: false
    }
  },

  computed: {
    sticky () {
      let navbar = document.getElementById('navbar')
      return navbar.offsetTop
    }
  },

  mounted () {
    window.addEventListener('scroll', () => this.handleScroll())
  },

  methods: {
    handleScroll () {
      this.isSticky = window.pageYOffset >= this.sticky ? true : false
    }
  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.content {
  padding: 16px;
}

.banner {
  padding: 15px;
  display: block;
  overflow: hidden;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index:3000;
}

.sticky + .content {
  padding-top: 70px;
}


</style>


