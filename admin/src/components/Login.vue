<template>
  <el-container>
    <el-header><my-header /></el-header>
    <el-main>
      <el-card
        style="width:400px;height:400px;margin:0 auto"
      >
        <h3>管理员登陆</h3>
        <el-form
          ref="form"
        >
          <el-form-item>
            <el-input
              v-model="name"
              placeholder="请输入管理员账号"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="pwd"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              @click="login(name, pwd)"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <el-footer><my-footer /></el-footer>
  </el-container>
</template>

<script>
import MyHeader from './public/Header.vue'
import MyFooter from './public/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  },

  data () {
    return {
        name: '',
        pwd: ''
    }
  },

  methods: {
    login: async function (name, pwd) {
      try {
        let dataSend = { name, pwd }
        let {data} = await this.$axios.post('/api/login', dataSend)
        let {message} = data
        this.showMessage(message, 'success')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.showMessage(err.toString(), 'error')
      }
    },

    showMessage (msg, type) {
      this.$message({
        message: msg,
        type: type,
        center: true,
        showClose: true,
        duration: 1500
      })
    }
  }
}
</script>

<style scoped>

</style>
