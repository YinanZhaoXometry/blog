<template>
  <section>
    <my-header class="header" />
    <div class="main-container">
      <div class="main">
        <transition name="fade" mode="out-in">
          <nuxt class="content" />
        </transition>
        <side-bar class="side-bar" />
      </div>
    </div>
    <my-footer class="footer" />
  </section>
</template>

<script>
import MyHeader from '~/components/public/Header.vue'
import MyFooter from '~/components/public/Footer.vue'
import SideBar from '~/components/public/SideBar.vue'

export default {
  components: {
    MyHeader,
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

.main-container {
  position: relative;
  width: 100%;
  top: 130px;
}

.footer {
  margin-top: 130px;
}

@media screen and (min-width: 993px) {
  .main {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
  }
  .content, .side-bar {
    padding: 0 20px;
    flex: 1;
  }
  .content {
    max-width: 700px;
  }
  .side-bar {
    max-width: 350px;
  }

}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .content {
    padding: 0 10px;
  }
  .content {
    max-width: 992px;
  }
  .side-bar {
    max-width: 992px;
    display: flex;
  }
  .side-bar>div {
    flex: 1;
    padding: 10px;
  }
}

@media screen and (max-width: 767px) {
  .content, .side-bar {
    padding: 30px;
  }
  .content>article>.el-card {
    margin-bottom: 50px;
  }
  .side-bar>div {
    margin-bottom: 30px;
  }
}


</style>


