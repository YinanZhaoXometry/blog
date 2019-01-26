<template>
  <section class="top-section">
    <my-header id="navbar" />
    <div>
      <nuxt class="article-content" />
    </div>
    <my-footer class="article-footer" />
  </section>
</template>

<script>
import MyHeader from '~/components/public/Header.vue'
import MyFooter from '~/components/public/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  },

  data () {
    return {
      prevScrollPos: ''
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let currentScrollPos = window.pageYOffset
      let navbar = document.getElementById('navbar')
      if (this.prevScrollPos > currentScrollPos) {
        navbar.style.top = "0"
      } else {
        navbar.style.top = "-200px"
      }
      this.prevScrollPos = currentScrollPos
    }
  }

}
</script>

