<template>
  <div class="topnav">
    <el-row>
      <el-col :span="19">
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
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="searchKeyword"
          class="search-bar"
          placeholder="搜索酷核"
          @keyup.native.enter="search"
        >
          <el-button
            slot="append"
            type="primary"
            icon="el-icon-search"
            @click="search"
          />
        </el-input>
      </el-col>
    </el-row>
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
    }
  }
}
</script>

<style>

.topnav {
  background-color: #333;
  overflow: hidden;
  width:100%;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  display:block;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
  text-decoration: none;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.search-bar {
  margin-top: 6px;
  font-size: 16px;
  margin-left:-20px;
}


</style>
