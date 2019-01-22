<template>
  <div id="myNavbar" class="navbar">
    <nuxt-link to="/" class="site-logo"><b>KuHe 酷核</b></nuxt-link>
    <el-input
      v-model="searchKeyword"
      class="search-bar"
      placeholder="搜索酷核"
      @keyup.native.enter="search"
    >
      <el-button
        slot="append"
        size="small"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
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
    <!-- <a href="javascript:void(0);" class="icon" @click="myFunction">&#9776;</a> -->
    <a href="javascript:void(0);" class="icon" @click="myFunction"><i class="fa fa-bars" /></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      isNavActive: true,
      currentActiveTab: 'index',
      searchKeyword: '',

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
    },

    search () {
      if (this.searchKeyword.trim()) {
        this.$router.push(`/search/${this.searchKeyword}`)
      }
    },

    myFunction () {
      console.log(123)
      let x = document.getElementById('myNavbar')
      if (x.className === "navbar") {
        x.className += " responsive"
      } else {
        x.className = "navbar"
      }
    }
  }
}
</script>

<style>

.navbar {
  background-color: #1D365D;
  overflow: hidden;
  width:100%;
  height: 80px;
  box-shadow: 0 0 12px rgba(0,0,0,0.5);
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
  overflow: hidden;

}

.navbar a:hover {
  /* background-color: #137FB3; */
  color: #ffffff;
}

.navbar a.active {
  background-color: #172B4A;
  color:#ffffff;
}

/* .navbar .icon {
  display: none;
} */


.search-bar {
  margin-top: 20px;
  font-size: 16px;
  /* margin-left:0px; */
  width: 240px;
}

.site-logo {
  font-size: 25px !important;
  padding: 0 30px !important;
}

@media screen and (max-width: 800px) {
  .navbar a:not(:first-child) {display: none;}
  .navbar a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 800px) {
  .navbar.responsive {position: relative;}
  .navbar.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .navbar.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

</style>
