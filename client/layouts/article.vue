<template>
  <section class="top-section">
    <my-header id="navbar" />
    <div>
      <nuxt class="content" />
    </div>
    <my-footer />
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

<style scoped>

top-section {
  margin: 0;
  padding: 0;
  width:100%;
}

#navbar {
  transition: top 0.5s;
}

.content {
  margin-top: 100px !important;
}
</style>
