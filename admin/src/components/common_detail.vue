<template>
  <div class="common_detail">
    <template v-for="(group, index) in groups">
      <div :key="group.title" class="dialog-body-group-title" :style="group.style_title">
        {{ group.title }}
      </div>
      <div :key="index" >
        <template v-for="(item, key) in group.list">

          <!-- text -->
          <div v-if="item.type=='text'" :key="item.title" class="form-item" style="height:30px;line-height:30px;">
            <label :class="['form-label', item.required ? 'form-required' : '']" style="min-width:160px;height:30px;line-height:30px;">
              <span>{{ item.title }}</span>
            </label>
            <div class="form-input-block" style="margin-left:30px;height:30px;line-height:30px;">
              <div class="input-block_center" style="line-height:30px;text-align:left;">
                {{ item.value }}
              </div>
              <div class="input-block_right" style="height:30px;line-height:30px;">
                <el-button
                  v-for="(btn, index) in item.btnList"
                  :key="index"
                  :class="[btn.type=='text' && index!=(item.btnList.length-1)?'btn-divide-line':'']"
                  :type="btn.type"
                  :size="btn.size"
                >
                  {{ btn.text }}
                </el-button>
              </div>
            </div>
          </div>

          <!-- button -->
          <div v-if="item.type=='divider'" :key="item.title" class="form-item form-item-divider">
          </div>

        </template>
      </div>
    </template>
  </div>
</template>
<script type="text/javascript">
import InfoTable from '@/components/common_table.vue'
export default {
  name: '',
  components: { InfoTable },
  props: ['groups'],
  data() {
    var validateSelect = (rule, value, callback) => {
      if (value instanceof Array) {
        if (value.length <= 0) {
          return callback(new Error('不能为空'))
        } else {
          callback()
        }
      }
      if (typeof value === 'string') {
        if (value === '') {
          return callback(new Error('不能为空'))
        } else {
          callback()
        }
      }
    }
    return {
      args: [],
      // element表单验证规则配置
      rules: { value: [{ validator: validateSelect, trigger: ['blur', 'change'] }] },
      isFirstTimeValidate: true // 用于解决element的bug，判断是首次进行select多项选择的表单验证，
    }
  },
  computed: {
    uploadUrl() {
      // return this.$api.host + this.$api.api.upload
      return ''
    }
  },
  mounted() {},
  methods: {
  }
}
</script>
<style lang="scss">
.common_detail {
  color: #666;
  font-size: 14px;
  .common-dialog-upload-img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
    cursor: pointer;
  }
  .common-dialog-upload-small {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkbox_pl {
    padding-left: 20px;
  }
  .input-block_center {
    flex:1;
  }
  .input-block_right {
  width: 20%;
  text-align: center;
  }
  .btn-box {
    text-align:center;
    /* display: flex;
    justify-content: space-evenly; */
  }
  .btn-divide-line {
    position: relative;
  }
  .btn-divide-line:after {
    right: -6px;
    position: absolute;
    content: '';
    width: 1px;
    height: 10px;
    border-right: 1px solid #aaa;
  }
  .form-item-divider {
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
}
</style>
