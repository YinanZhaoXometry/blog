<template>
  <div style="margin-bottom:15px;">
    <div class="admin-details-header">
      <div class="admin-details-header-text" @click="isPanelFold=!isPanelFold">
        {{ tableData.title }}
        <!-- 菜单栏按钮 -->
        <div v-if="tableData.btnList" class="details-header-btn-box">
          <el-button
            v-for="(item,index) in tableData.btnList"
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
          v-if="isPanelFold"
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

        <!-- 一行一列 -->
        <template v-if="tableData.type == 'oneColumn'">
          <div
            v-for="(elem,key) in tableData.list"
            :key="key"
            class="only_row flex"
          >
            <div style="color:#999;">{{ elem.title }}：</div>
            <div class="max_w flex ptb10">
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
        <div v-if="tableData.type == 'twoColumn'" class="flex" style="flex-wrap:wrap;border-right:1px solid #e1e6eb">
          <div
            v-for="(elem,key) in tableData.list"
            :key="key"
            class="dual-row flex"
          >
            <div style="color:#999;">{{ tableData.v }}：</div>
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

        <!-- 一行三列 -->
        <div v-if="tableData.type == 'threeColumn'" class="admin-details-table" style="table-layout:fixed">
          <div
            v-for="(elem,key) in tableData.list"
            :key="key"
            class="details-table-item flex"
          >
            <span style="color:#999;">{{ elem.title }}：</span>
            <div class="flex">
              <template v-if="elem.img">
                <img
                  v-for="url in elem.img"
                  :key="url"
                  click=""
                  class="w30 h30 mr5"
                  :src="elem"
                  style="cursor:pointer"
                  @click="onClickImg(elem, url)"
                >
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
        <div v-if="tableData.type == 'table'" class="details_table_box">
          <div
            v-if="tableData.thList"
            class="details_table_th details_table_tit flex"
          >
            <div
              v-for="(tit_item,tit_index) in tableData.thList"
              :key="tit_index"
              class="max_w details_table_item"
              style="background:#ebf2f6;"
            >{{ tit_item }}</div>
          </div>
          <template v-if="tableData.trList">
            <div v-if="tableData.trList.length==0" class="no-data-column">暂无数据</div>
            <div v-for="(tr_item,tr_index) in tableData.trList" :key="tr_index" class="details_table_th flex">
              <div
                v-for="(td_item,td_index) in tr_item"
                :key="td_index"
                class="max_w details_table_item"
              >{{ td_item }}</div>
            </div>
          </template>

          <div
            v-if="tableData.thObjList && tableData.trObjList"
            class="details_table_th details_table_tit flex"
          >
            <div
              v-for="(tit_item,tit_index) in tableData.thObjList"
              :key="tit_index"
              class="max_w details_table_item"
              style="background:#ebf2f6;"
            >{{ tit_item.name }}</div>
          </div>

          <div
            v-for="(tr_item,tr_index) in tableData.trObjList"
            :key="tr_index"
            class="details_table_th flex"
          >
            <!-- 按钮 -->
            <template v-for="(td_item,td_index) in tr_item">
              <div
                v-if="td_item.type=='button'"
                :key="td_index"
                class="max_w details_table_item content-button"
                :style="{color:td_item.clickable?'#40a9ff':'',cursor:td_item.clickable?'pointer':''}"
                @click="td_item.clickable?click_cb(tr_item,tr_index):''"
              >
                <template v-for="(i,j) in td_item.list">
                  <el-button
                    :key="j"
                    style="margin-right:5px"
                    type="text"
                    @click="onClickContentBtn(i)"
                  >{{ i.name }}</el-button>
                  <div
                    v-if="j!=(td_item.list.length-1)"
                    :key="j"
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
              >{{ td_item.name }}</div>
            </template>
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
  methods: {
    // 点击菜单栏的按钮后，触发父组件监听事件
    onClickMenuBtn(item) {
      this.$emit(item.action)
    },
    // 点击子菜单栏的按钮后，触发父组件监听事件
    onClickSubmenuBtn(item, index) {
      this.$emit(item.action, index)
    },
    // 点击内容的按钮后，触发父组件监听事件
    onClickContentBtn(item) {
      this.$emit(item.action, item)
    },
    // 点击图片后，触发父组件监听事件
    onClickImg(item, url) {
      if (item.action) {
        this.$emit(item.action, url)
      }
    }
  }
}
</script>
<style scoped>
.no-data-column {
  text-align:center;
  height:40px;
  line-height:40px;
  border:1px solid #e5e5e5;
  border-top:transparent;
  color:#bbb;
}
</style>
