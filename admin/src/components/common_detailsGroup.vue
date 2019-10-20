<template>
  <div style="margin-bottom:15px;">
    <div class="admin-details-header">
      <div class="admin-details-header-text" @click="isPanelFold=!isPanelFold">
        {{ tableData.title }}
        <!-- 菜单栏按钮 -->
        <div v-if="tableData.menuBtns" class="details-header-btn-box">
          <el-button
            v-for="(item,index) in tableData.menuBtns"
            :key="index"
            class="details-header-btn"
            size="mini"
            @click.stop="onClickMenuBtn(item)"
          >
            {{ item.text }}
          </el-button>
        </div>
      </div>
      <!-- 展开/收缩箭头 -->
      <div>
        <span
          v-if="!isPanelFold"
          class="details-header-btn-arrow"
          @click="isPanelFold=!isPanelFold"
        >
          <a class="el-icon-arrow-down" />
        </span>
        <span
          v-else
          class="details-header-btn-arrow"
          @click="isPanelFold=!isPanelFold"
        >
          <a class="el-icon-arrow-up" />
        </span>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <template v-if="!isPanelFold">
        <div
          v-loading="tableData.isLoading"
          element-loading-spinner="el-icon-loading"
          :class="[tableData.isLoading?'details-item-loading-box':'']"
        >
          <div v-for="(item,index) in tableData.groups" :key="index">
            <!-- 小标题和小标题按钮 -->
            <div class="subtitle-box">
              <span>{{ item.title }}</span>
              <div v-if="item.submenuBtns" class="submenu-btn-box">
                <el-button v-for="(i,j) in item.submenuBtns" :key="j" :disabled="item.State==9||tableData.State==9" :type="i.type" size="mini" style="margin-left:5px;" @click="onClickSubmenuBtn(i, index)">
                  {{ i.text }}
                </el-button>
              </div>
            </div>

            <!-- 一行一列 -->
            <template v-if="item.type=='oneColumn'">
              <div v-for="(elem,key) in item.list" :key="key" class="only_row flex">
                <div v-if="elem.title" style="color:#999;">{{ elem.title }}：</div>
                <div class="max_w flex ptb5" :class="[item.centered?'text-align-center':'']">
                  <el-button
                    v-if="elem.clickable"
                    type="text"
                    style="font-size:12px; cursor: pointer;"
                    class="h40 flex"
                    @click="onClickContentBtn(elem)"
                  >
                    {{ elem.value }}
                  </el-button>
                  <div
                    v-else
                    style="font-size:12px; "
                    :style="{color:elem.color?elem.color:'#000'}"
                    class="h40 flex"
                  >
                    {{ elem.value }}
                  </div>
                  <template v-if="elem.img_arr">
                    <img
                      v-for="(img_item,img_index) in only_item.img_arr"
                      :key="img_index"
                      class="ml10"
                      :style="{width:only_item.img_w,height:only_item.img_h}"
                      :src="img_item"
                    >
                  </template>
                </div>
              </div>
            </template>

            <!-- 一行两列 -->
            <div v-if="item.type == 'twoColumn'" class="flex" style="flex-wrap:wrap;border-right:1px solid #e1e6eb">
              <div
                v-for="(elem,key) in item.list"
                :key="key"
                class="dual-row flex"
              >
                <div style="color:#999;">{{ item.title }}：</div>
                <div class="max_w flex ptb10">
                  <el-button
                    v-if="elem.clickable"
                    type="text"
                    style="font-size:12px; cursor: pointer;"
                    class="h40 flex"
                    @click="onClickContentBtn(elem)"
                  >
                    {{ elem.title }}
                  </el-button>
                  <div
                    v-else
                    style="font-size:12px; "
                    :style="{color:elem.color?elem.color:'#000'}"
                    class="h40 flex"
                  >
                    {{ elem.value }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 默认为：一行三列 -->
            <div v-if="!item.type" class="admin-details-table" style="table-layout:fixed">
              <div
                v-for="(elem,key) in item.list"
                :key="key"
                class="details-table-item flex"
              >
                <span style="color:#999;">{{ elem.title }}：</span>
                <div class="flex">

                  <template v-if="elem.img&&(elem.img instanceof Array)">
                    <img
                      v-for="j in elem.img"
                      :key="j"
                      class="w30 h30 mr5"
                      :src="j"
                      style="cursor:pointer"
                    >
                  </template>
                  <template v-if="elem.img&&(typeof elem.img == 'string')">
                    <img class="w30 h30 mr5" :src="elem.img" style="cursor:pointer" @click="onClickImg(elem.img)">
                  </template>

                  <div class="flex">
                    <el-button
                      v-if="elem.clickable"
                      type="text"
                      style="font-size:12px; cursor: pointer;"
                      class="h40 flex"
                      @click="onClickContentBtn(elem)"
                    >
                      {{ elem.value }}
                    </el-button>
                    <div
                      v-else
                      style="font-size:12px; "
                      :style="{color:elem.color?elem.color:'#000'}"
                      class="h40 flex"
                    >
                      {{ elem.value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 表格布局 -->
            <div v-if="item.type == 'table'" class="details_table_box">

              <!-- 数据格式：字符串构成的数组 -->
              <div
                v-if="item.thList && item.trList"
                class="details_table_th details_table_tit flex"
              >
                <div
                  v-for="(tit_item,tit_index) in item.thList"
                  :key="tit_index"
                  class="max_w details_table_item"
                  style="background:#f7f7f7;"
                >{{ tit_item }}</div>
              </div>
              <div
                v-for="(tr_item,tr_index) in item.trList"
                :key="tr_index"
                class="details_table_th flex"
              >
                <div
                  v-for="(td_item,td_index) in tr_item"
                  :key="td_index"
                  class="max_w details_table_item"
                >{{ td_item }}</div>
              </div>

              <!-- 数据格式：对象构成的数组 -->
              <div
                v-if="item.thObjList && item.trObjList"
                class="details_table_th details_table_tit flex"
              >
                <div
                  v-for="(tit_item,tit_index) in item.thObjList"
                  :key="tit_index"
                  class="max_w details_table_item"
                  style="background:#f7f7f7;"
                >{{ tit_item.name }}</div>
              </div>
              <!-- 无数据显示内容 -->
              <div v-if="item.trObjList.length==0" class="no-data-column">暂无数据</div>

              <div
                v-for="(tr_item,tr_index) in item.trObjList"
                :key="tr_index"
                class="details_table_th flex"
              >
                <!-- 按钮 -->
                <template v-for="(td_item,td_index) in tr_item">
                  <!-- 按钮1 -->
                  <div v-if="td_item.btnList" :key="td_index" class="max_w details_table_item content-button">
                    <template v-for="(i,j) in td_item.btnList">
                      <!-- 为删除按钮popup提示框 -->
                      <el-popover v-if="i.name=='删除'" :key="j" v-model="tr_item.isDeletePopupShow" :disabled="item.State==9" trigger="click" placement="top" width="160">
                        <p style="text-align:center;padding:10px 0;">确定要删除吗？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" :disabled="tableData.isDeleting" type="text" @click="tr_item.isDeletePopupShow = false">取消</el-button>
                          <el-button type="primary" :loading="tableData.isDeleting" size="mini" @click="onClickTableBtn(i, index, tr_index)">确定</el-button>
                        </div>
                        <el-button
                          slot="reference"
                          size="mini"
                          class="table-inline-btn"
                          type="text"
                          :disabled="item.State==9"
                        >删除</el-button>
                      </el-popover>
                      <!-- 其他按钮没有提示框 -->
                      <el-button
                        v-else
                        :key="j"
                        :disabled="item.State==9"
                        style="margin-right:5px"
                        type="text"
                        @click="onClickTableBtn(i, index, tr_index)"
                      >{{ i.name }}</el-button>
                      <!-- 按钮分割竖线 -->
                      <div
                        v-if="j!=(td_item.btnList.length-1)"
                        :key="j+i.name"
                        style="margin-right:5px;margin-top:-2px;"
                        class="table-inline-divider"
                      />
                    </template>
                  </div>

                  <!-- 普通内容 -->
                  <div
                    v-else
                    :key="td_index"
                    class="max_w details_table_item"
                    :style="{color:td_item.clickable?'#40a9ff':'',cursor:td_item.clickable?'pointer':''}"
                    @click="td_item.clickable?click_cb(tr_item,tr_index):''"
                  >
                    {{ td_item.name }}
                  </div>
                </template>
              </div>
            </div>

          </div>
        </div>

      </template>

    </transition>
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  components: {},
  props: ['tableData'],
  data() {
    return {
      isPanelFold: false
    }
  },
  computed: {},
  watch: {
    tableData: {
      handler: function (val) {
        if (val.groups) {
          val.groups.forEach(item => {
            if (item.type == 'table') {
              item.thObjList.forEach(elem => {
                if (elem.btnList) {
                  item.trObjList.forEach((j, i, arr) => {
                    if (j.length < item.thObjList.length) {
                      arr[i].push({ btnList:elem.btnList })
                    }
                  })
                }
              })
            }
          })
        }
      },
      deep: true
    }
  },
  created () {
  },
  methods: {
    // 点击菜单栏的按钮后，触发父组件监听事件
    onClickMenuBtn(item) {
      this.$emit(item.action)
    },
    // 点击子菜单栏的按钮后，触发父组件监听事件
    onClickSubmenuBtn(item, index) {
      console.log('action')
      this.$emit(item.action, index)
    },
    // 点击内容的按钮后，触发父组件监听事件
    onClickContentBtn(item) {
      console.log(item)
      this.$emit(item.action, item)
    },
    // 点击图片后，触发父组件监听事件
    onClickImg(url) {
      this.$emit('preview', url)
    },
    onClickTableBtn (btn, groupIdx, rowIdx) {
      this.$emit(btn.action, { groupIdx, rowIdx })
    }
  }
}
</script>
<style scoped>
.subtitle-box {
  border: 1px solid #e5e5e5;
  border-top: transparent;
  font-weight:bold;
  font-size:14px;
  text-align:center;
  height: 40px;
  line-height:40px;
}
.text-align-center {
  justify-content: center;
  align-items: center;
}
.submenu-btn-box {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 5px;
}
.no-data-column {
  text-align:center;
  height:40px;
  line-height:40px;
  border:1px solid #e5e5e5;
  border-top:transparent;
  color:#bbb;
}
</style>
