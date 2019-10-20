<template>
  <div class="common_form">
    <template v-for="(group, index) in groups">
      <div :key="group.title" class="dialog-body-group-title" :style="group.style_title">
        {{ group.title }}
      </div>
      <div :key="index" class="dialog-body-group" :style="group.style">
        <template v-for="(item, key) in group.list">

          <!-- input -->
          <div v-if="item.type=='input'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-input
                  v-model="item.value"
                  :type="item.inputType"
                  :placeholder="item.placeholder?item.placeholder:'请输入'+item.title"
                  :disabled="item.disabled || false"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- textarea -->
          <div v-if="item.type=='textarea'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-input
                  v-model="item.value"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :placeholder="item.placeholder?item.placeholder:'请输入'+item.title"
                  resize="none"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 日期选择 -->
          <div v-if="item.type=='date'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-date-picker
                  v-model="item.value"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="flex:1"
                  :placeholder="item.placeholder"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 日期时间选择 -->
          <div v-if="item.type=='dateTime'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-date-picker
                  v-model="item.value"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="flex:1"
                  :placeholder="item.placeholder"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 起止日期选择  -->
          <div v-if="item.type=='dateTo'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-date-picker
                  v-model="item.value"
                  value-format="yyyy-MM-dd"
                  :placeholder="item.placeholder"
                  style="flex:1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 起止日期时间 -->
          <div
            v-if="item.type=='dateTimeRange'"
            :key="item.title"
            class="form-item"
          >
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-date-picker
                  v-model="item.value"
                  :placeholder="item.placeholder"
                  style="flex:1"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- radio -->
          <div v-if="item.type=='radio'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <div class="flex h40">
                  <el-radio
                    v-for="(item,index) in item.radio_list"
                    :key="index"
                    v-model="item.value"
                    :label="item"
                  >{{ item }}</el-radio>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <!-- checkbox -->
          <div v-if="item.type=='checkbox'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <div class="flex h40">
                  <el-checkbox-group v-model="item.value" class="flex h40">
                    <el-checkbox v-for="(item,index) in item.check_list" :key="index" :label="item" />
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <!-- checkbox 2  -->
          <div v-if="item.type=='checkbox2'" :key="item.title" class="form-item lsj_box_2">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <div class="form-input-block" style="border:1px #fff solid">
              <el-checkbox-group v-model="item.value" class="h40">
                <el-checkbox v-for="(item,index) in item.check_list" :key="index" :label="item" />
              </el-checkbox-group>
            </div>
          </div>

          <!-- checkbox 3  -->
          <div v-if="item.type=='checkbox3'" :key="item.title" class="form-item lsj_box_3">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block" style="border:1px #fff solid">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <div class="checkbox3_left">
                  <input id="checkbox3" class="checkbox_input" type="checkbox" value>
                </div>
                <el-checkbox-group v-model="item.value" class="h40">
                  <el-checkbox v-for="(item,index) in item.check_list" :key="index" :label="item" />
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>

          <!-- upload -->
          <div v-if="item.type=='upload'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <div v-if="!(item.value instanceof Array)" class="form-input-block">
              <div v-if="item.value" style="display:flex">
                <img class="common-dialog-upload-img" :src="item.value" alt @click="previewImg(item.value)">
                <el-upload
                  class="common-dialog-upload-small"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="onUploadSuccess"
                  style="border:1px dashed #bbb;"
                  multiple
                >
                  <i class="el-icon-plus" style="font-size:22px;color:#bbb;" />
                </el-upload>
              </div>
              <el-upload
                v-else
                class="upload-demo"
                drag
                :action="uploadUrl"
                :on-success="onUploadSuccess"
                :multiple="item.multiple"
              >
                <i class="el-icon-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </div>
            <div v-else class="form-input-block" style="display:flex">
              <img
                v-for="item in item.value"
                :key="item"
                class="common-dialog-upload-img"
                :src="item.indexOf('http://crmg.entfly.com')==-1 ? 'http://crmg.entfly.com'+item : item"
                alt
                @click="previewImg(item)"
              >
              <el-upload
                class="common-dialog-upload-small"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="onUploadSuccess"
                style="border:1px dashed #bbb;"
                :multiple="item.multiple"
              >
                <i class="el-icon-plus" style="font-size:22px;color:#bbb;" />
              </el-upload>
            </div>
          </div>
          <!-- <div
           :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required&&!item.isChecked?'change':''],
                  message: item.cnName?item.cnName+'不能为空':'不能为空'
                }"
          ></div> -->
          <!-- select -->

          <div v-if="item.type=='select'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :ref="'selectForm'+key" :model="item" class="form-input-block" style="border:1px #fff solid">
              <el-form-item
                ref="formItem"
                prop="value"
                :rules="{ validator: validateSelect, trigger: [item.required?'blur':'', item.required?'change':''],
                          myValue: item.cnName?item.cnName:'' }"
              >
                <div v-if="item.checkbox" class="checkbox_left">
                  <input id="checkbox3" class="checkbox_input" type="checkbox">
                </div>
                <el-select
                  v-model="item.value"
                  :class="[item.checkbox?'checkbox_pl':'']"
                  :multiple="item.isChecked"
                  style="width:100%;"
                  :placeholder="item.placeholder"
                  @blur="onSelectBlur('selectForm'+key, item.required)"
                  @change="onSelectChange(elem)"
                >
                  <el-option
                    v-for="(i,j) in item.options"
                    :key="i.label+i.value+j"
                    :label="i.label"
                    :value="i.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <!-- switch -->
          <div v-if="item.type=='switch'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <!-- <div class="form-input-block" style="height:40px;display:flex;align-items:center;"> -->
                <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#ff4949" />
              </el-form-item>
            </el-form>
          </div>



          <!-- 富文本编辑框 -->
          <!-- <div v-if="item.type=='richText'" class="form-item" :key="item.title">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{item.title}}</span>
            </label>
            <el-form :model="item"
              class="form-input-block"
              v-loading="ueditorConfig.isLoading"
              element-loading-spinner="el-icon-loading"
            >
              <el-form-item
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }" prop="value" ref="formItem">
                <vue-ueditor-wrap ref='ueditor' @ready="UEditorReady" v-model="item.value" :config="ueditorConfig"></vue-ueditor-wrap>
              </el-form-item>
            </el-form>
          </div> -->

          <!-- button -->
          <div v-if="item.type=='button'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <div class="form-input-block">
              <el-button type="text">{{ item.text }}</el-button>
            </div>
          </div>

          <!-- inputNumber -->
          <div v-if="item.type=='number'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <el-form :model="item" class="form-input-block">
              <el-form-item
                ref="formItem"
                :rules="{
                  required: item.required, trigger: [item.required?'blur':'', item.required?'change':''],
                  message: (item.cnName?item.cnName+'不能为空':'不能为空')
                }"
                prop="value"
              >
                <el-input-number
                  v-model="item.value"
                  :min="1"
                  :max="100"
                  :label="item.title"
                  :disabled="item.disabled"
                  @change="handleChange"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- interval 最大值-最小值 -->
          <div v-if="item.type=='interval'" :key="item.title" class="form-item">
            <label :class="['form-label', item.required ? 'form-required' : '']">
              <span>{{ item.title }}</span>
            </label>
            <div class="form-input-block">
              <el-input-number v-model="item.value.min" />
              <span style="line-height:40px;display:inline-block;margin:0 10px;">-</span>
              <el-input-number v-model="item.value.max" />
            </div>
          </div>

        </template>
      </div>
    </template>
  </div>
</template>
<script type="text/javascript">
import InfoTable from '@/components/common_table.vue'
// import VueUeditorWrap from 'vue-ueditor-wrap'
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
      // 百度UEditor富文本编辑框配置
      ueditorConfig: {
        isLoading: true,

        // 初始容器高度
        initialFrameHeight: 150,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // UEditor 资源文件的存放路径
        UEDITOR_HOME_URL: './static/UEditor/',
        zIndex: 3000
      },
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
    validateSelect  (rule, value, callback) {
      if (value instanceof Array) {
        this.groups.forEach(item => {
          item.list.forEach(elem => {
            if (item.type == 'select' && item.isChecked) {
              if (item.shouldValidate) {
                return value.length <= 0 ? callback(new Error(rule.myValue + '不能为空')) : callback()
              } else {
                item.shouldValidate = true
              }
            }
          })
        })
      }
      if (typeof value === 'string') {
        if (value === '') {
          return callback(new Error(rule.myValue + '不能为空'))
        } else {
          callback()
        }
      }
    },
    UEditorReady () {
      this.ueditorConfig.isLoading = false
    },
    onUploadSuccess(...args) {
      this.config.forEach(elem => {
        item.list.forEach(item => {
          if (item.type == 'upload') {
            if (item.value instanceof Array) {
              if (item.isSingle) {
                item.value = [args[0].data.src]
              } else {
                item.value.push(args[0].data.src)
              }
            } else {
              item.value = args[0].data.src
            }
          }
        })
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleChange(num) {
      console.log(num)
    },
    onSelectChange(elem) {
      console.log('change', elem)
      this.$emit('selectChange', elem)
    },
    // 预览图片
    previewImg (url) {
      this.$emit('preview', url)
    },
    // select组件失焦后进行验证
    onSelectBlur (refName, isRequired) {
      if (isRequired) {
        this.$refs[refName][0].validate(
          (valid) => {
            if (!valid) {
              console.log('error submit!!')
              return false
            }
          }
        )
      }
    },
    // 重置表单，及其校验结果
    clearFormValidate () {
      this.$refs.formItem.forEach(item => {
        item.resetField()
      })
    },
    // 校验表单
    validateForm () {
      let finalResult = true
      if (this.$refs.formItem) {
        this.$refs.formItem.forEach(item => {
          if (item.$parent.model.required) {
            item.$parent.validate((result) => {
              if (!result) finalResult = result
            })
          }
        })
      }
      return finalResult
    },
    onClickTextareaBtn (elem) {
      if (!item.label && !item.value) {
        this.$emit('showTreeDialog')
      } else {
        this.$emit('showTreeDialog', item.value)
      }
    },
    onClickTextareaBtn2(elem) {
      if (!item.label && !item.value) {
        this.$emit('showTreeDialog1')
      } else {
        this.$emit('showTreeDialog1', item.value)
      }
    }
  }
}
</script>
<style>
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
.checkbox_left {
  z-index: 100000;
  height: 100%;
  width: 30px;
  position: absolute;
  left: 0;
  background: #e2e2e2;
}
.checkbox_left .checkbox_input {
  margin-left: 10px;
  margin-top: 15px;
  font-size: 16px;
}
.checkbox_pl {
  padding-left: 20px;
}
.my-textarea textarea {
  padding-bottom:3 0px !important;
}
.common_form {
  color: #666;
  font-size: 14px;
}
.common_form .el-switch {
  height: 40px;
}
</style>
