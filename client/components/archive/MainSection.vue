<template>
  <section>

  </section>
</template>

<script>
export default {
  data () {
    return {
      displayYear: 0,
      displayDate: 0
    }
  },

  computed: {
    articleList () {
      return this.$store.state.articleList
    },
    totalArticleCount () {
      return this.$store.state.totalArticleCount
    }
  },

  methods: {
    isDisplay (year) {
      if (this.displayYear !== year) {
        this.displayYear = year
        return true
      }
      return false
    }
  }
}
</script>
