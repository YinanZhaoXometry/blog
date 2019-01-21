<template>
  <section class="top-section">
    <header id="navbar">
      <banner />
      <navbar />
    </header>
    <div>
      <nuxt class="content" />
    </div>
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
      prevScrollPos: ''
    }
  },

  mounted () {
    window.addEventListener('scroll', () => {
      let currentScrollPos = window.pageYOffset
      let navbar = document.getElementById('navbar')
      if (this.prevScrollPos > currentScrollPos) {
        navbar.style.top = "0"
      } else {
        navbar.style.top = "-200px"
      }
      this.prevScrollPos = currentScrollPos
    })
  },


}
</script>


<style scoped>

top-section {
  margin: 0;
  padding: 0;
  width:100%;
}

#navbar {
  position: fixed;
  width: 100%;
  top: 0;
  transition: top 0.3s;
  z-index: 4000;
  display: block
}

.content {
  margin-top: 100px !important;
}
</style>
