<template>
  <header class="header-container">
    <div id="myNavbar" class="navbar">
      <nuxt-link to="/" class="site-logo">KuHe 酷核</nuxt-link>
      <div class="search-container">
        <input v-model="searchKeyword" type="text" placeholder="搜索酷核" @keyup.enter="search">
        <button class="el-icon-search" @click="search" />
      </div>
      <nuxt-link
        to="/"
        :class="computeActiveClass('index')"
        name="index"
        @click.native="changeNavTab"
      >
        首页
      </nuxt-link>
      <nuxt-link
        to="/categories/coding"
        :class="computeActiveClass('coding')"
        name="coding"
        @click.native="changeNavTab"
      >
        编程
      </nuxt-link>
      <nuxt-link
        to="/categories/productivity"
        :class="computeActiveClass('productivity')"
        name="productivity"
        @click.native="changeNavTab"
      >
        生产力
      </nuxt-link>
      <nuxt-link
        to="/archive"
        :class="computeActiveClass('archive')"
        name="archive"
        @click.native="changeNavTab"
      >
        归档
      </nuxt-link>
      <nuxt-link
        to="/about"
        :class="computeActiveClass('about')"
        name="about"
        @click.native="changeNavTab"
      >
        关于
      </nuxt-link>
      <div id="menu-icon" @click="toggleMenu">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      isNavActive: true,
      currentActiveTab: 'index',
      searchKeyword: '',
      isWeb: true
    }
  },

  created () {
    let index = this.$route.path.lastIndexOf('/')
    let pathName = this.$route.path.slice(index+1)
    this.currentActiveTab = pathName ? pathName : 'index'
  },

  methods: {
    computeActiveClass (tabName) {
      if (this.currentActiveTab === tabName)
        return 'active'
      else
        return ''
    },

    changeNavTab (e) {
      this.currentActiveTab = e.target.name
      let classList = document.querySelector('.navbar').classList.toString()
      if(classList.indexOf('responsive')!== -1) {
        this.toggleMenu()
      }
    },

    search () {
      if (this.searchKeyword.trim()) {
        this.$router.push(`/search/${this.searchKeyword}`)
        this.searchKeyword = ''
      }
    },

    toggleMenu () {
      this.toggleIcon()
      let navbar = document.getElementById('myNavbar')
      navbar.classList.toggle("responsive");
    },

    toggleIcon() {
      let menuIcon = document.getElementById('menu-icon')
      menuIcon.classList.toggle("open");
    }
  }
}
</script>
