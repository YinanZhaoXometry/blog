<template>
  <header class="header-container">
    <div id="myNavbar" class="navbar">
      <nuxt-link to="/" class="site-logo"><b>KuHe 酷核</b></nuxt-link>
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
        to="/categories/front-end"
        :class="computeActiveClass('front-end')"
        name="front-end"
        @click.native="changeNavTab"
      >
        前端
      </nuxt-link>
      <nuxt-link
        to="/categories/back-end"
        :class="computeActiveClass('back-end')"
        name="back-end"
        @click.native="changeNavTab"
      >
        后端
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
      searchKeyword: ''
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

    toggleIcon(x) {
      let menuIcon = document.getElementById('menu-icon')
      menuIcon.classList.toggle("open");
    }
  }
}
</script>

<style>
.header-container {
  height: 80px;
  width: 100%;
  background-color: #1D365D;
  box-shadow: 0 0 12px rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  z-index: 500;
  /* top: 0; */
}




.navbar {
  position: relative;
  overflow: hidden;
  max-width: 1100px;
  margin: 0 auto;
}

.navbar a {
  float: left;
  color: #B9C8E0;
  display:block;
  text-align: center;
  padding: 0 25px;
  font-size: 17px;
  text-decoration: none;
  height: 80px;
  line-height: 80px;
}

.navbar a:hover {
  color: #ffffff;
}

.navbar a.active {
  background-color: #172B4A;
  color:#ffffff;
}

.search-bar {
  margin-top: 20px;
  font-size: 16px;
  /* margin-left:0px; */
  /* width: 240px; */
  float: left;
}

.site-logo {
  font-size: 25px !important;
  padding: 0 30px !important;
}

/* 搜索框 */
.search-container {
  float: left;
  display: block;
  margin-top: 20px;
  font-size: 16px;
}

.search-container input[type=text] {
  box-sizing: border-box;
  height: 40px;
  padding: 0 15px;
  vertical-align: middle;
  font-size: inherit;
  border:1px solid #dcdfe6;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  outline: none;
  color: #606266;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.search-container input[type=text]:hover {
  border-color: #c0c4cc;
}
.search-container input[type=text]:focus {
  border-color: #ff4060;
}
.search-container input[type=text]::placeholder {
  color: #c0c4cc;
}
.search-container button {
  /* display: inline-block; */
  box-sizing: border-box;
  height: 40px;
  margin-left: -6px;
  padding: 0 20px;
  line-height: 40px;
  vertical-align: middle;
  font-size: inherit;
  border: 1px solid #dcdfe6;
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
  color: #909399;
  background-color: #f5f7fa;
  transition: .1s;
  cursor: pointer;
}

/* 响应式菜单栏布局 */
@media screen and (max-width: 992px) {
  .navbar a:not(:first-child) {display: none;}
  #menu-icon {
    float: right;
  }
  .navbar .search-container {
    display: none
  }
  .navbar.responsive {position: relative}
  .navbar.responsive #menu-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .navbar.responsive a:not(.site-logo){
    display: block;
    float: none;
    /* text-align: left; */
    width: 100%;
    padding: 0;
    font-size: 20px;
  }
  .navbar.responsive .search-container{
    display: block;
    float: none;
    /* text-align: left; */
    width: 100%;
    margin: 0;
  }
  .navbar.responsive input[type=text],  .navbar.responsive button {
    display: block;
    float: none;
    text-align: center;
    width: 100%;
    border-radius: 0;
    height: 80px;
    font-size: 20px;
  }
  .navbar.responsive button {
    text-align: center;
    background: transparent;
    border: none;
  }
  .navbar.responsive button:hover {
      color: #ffffff;
  }

/* 响应式布局——menu开关按钮 */
  #menu-icon {
  width: 25px;
  height: 30px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
  margin-top: 28px;
  margin-right: 30px;
}

#menu-icon:hover span {
  background-color: #ffffff;
}

#menu-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #B9C8E0;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#menu-icon span:nth-child(1) {
  top: 0px;
}

#menu-icon span:nth-child(2),#menu-icon span:nth-child(3) {
  top: 8px;
}

#menu-icon span:nth-child(4) {
  top: 16px;
}

#menu-icon.open span:nth-child(1) {
  top: 8px;
  width: 0%;
  left: 50%;
}

#menu-icon.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#menu-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#menu-icon.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}
}

</style>
