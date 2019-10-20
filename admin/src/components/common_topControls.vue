<template>
  <ul class="control-area flex color_f nav_bl">
    <li class="control-area-item"><i class="iconfont layui-icon-ali-earth size18" /></li>
    <li class="control-area-item"><i class="el-icon-refresh-right size20" @click="refresh_page" /></li>
    <!-- 消息通知 -->
    <div class="color_f control-area-dropdown-item" style="position:relative">
      <span class="control-area-span" style="display:inline-block;width:100%;height:100%;" @hover="showDropMenuNoti=true" @click="showDropMenuNoti=!showDropMenuNoti"><i class="el-icon-bell size20" /></span>
      <transition name="fade">
        <div v-if="showDropMenuNoti" class="control-dropmenu-noti">
          <div class="control-dropmenu-header ">
            <span>消息通知</span>
            <div style="float:right;height:100%;display:flex;align-items:center;"><el-button type="text" style="font-size:12px">查看更多</el-button></div>
          </div>
          <div class="control-dropmenu-item">
            <p class="control-dropmenu-text">asdfasdfasdfasdfasdddddddddffffffffffffffasdfasdfasdfasdfasdddddddddffffffffffffffffffff</p>
            <p class="control-dropmenu-text">2019-05-11 12:20</p>
          </div>
          <div class="control-dropmenu-footer ">查看更多</div>
        </div>
      </transition>
    </div>
    <li class="control-area-item"><i class="el-icon-star-off  size20" /></li>
    <li class="control-area-item"><i class="el-icon-rank size20" /></li>
    <el-dropdown class="color_f control-area-item" trigger="click" style="width:70px" @command="handleCommand">
      <span class="el-dropdown-link" style="display:inline-block;width:100%;height:100%;">
        {{ user_name }}<i class="el-icon-caret-bottom el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown" class="w80 t_center">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item command="go_login">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <li class="control-area-item"><i class="iconfont layui-icon-ali-gengduo size18" /></li>
  </ul>
</template>
<script type="text/javascript">
export default {
  name: '',
  components: { },
  props: ['userName'],
  data () {
    return {
      showDropMenuNoti: false
    }
  },
  computed: {},
  methods: {
    refresh_page() {
      this.$router.go(0)
    },
    handleCommand(res) {
      if (res == 'go_login') {
        var exp = new Date()
        exp.setTime(exp.getTime() - 60 * 1000)
        document.cookie = 'is_login=0' + ';expires=' + exp.toGMTString()
        document.cookie = 'userName=null' + ';expires=' + exp.toGMTString()
        this.$store.dispatch('change_user', '未登录')
        this.$router.push('/railWayAdmin/login')
      }
    }
  }
}
</script>
<style scoped>
.color_f {
  color: #fff;
}
.size20 {
  font-size: 20px;
}
.nav_br {
  border-right: 1px solid transparent;
}
.nav_bl {
  border-left: 1px solid transparent;
}
.flex_c_c {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
