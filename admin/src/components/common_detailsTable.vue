<template>
  <!-- <div style="display:inline-block;width:47%;margin-right:30px;"> -->
  <div class="mb15">
    <div class="admin-details-header">
      <div class="admin-details-header-text" @click="isPanelFold=!isPanelFold">
        {{ tableData.title }}
        <!-- 菜单栏按钮 -->
        <div class="details-header-btn-box">
          <template v-if="tableData.btnList">
            <el-button
              v-for="(item,index) in tableData.btnList"
              :key="index"
              class="details-header-btn"
              size="mini"
              @click.stop="onclick(item)"
            >{{ item.text }}</el-button>
          </template>
        </div>
      </div>
      <!-- 展开/收缩按钮 -->
      <div v-if="tableData.btn" style="margin-right:10px; border-right: 1px solid rgb(225, 230, 235);" class="details-header-btn-arrow" @click="editor()">
        编辑
      </div>
      <div>
        <span v-if="isPanelFold" class="details-header-btn-arrow" @click="isPanelFold=!isPanelFold">
          <a class="el-icon-arrow-down" />
        </span>
        <span v-else class="details-header-btn-arrow" @click="isPanelFold=!isPanelFold">
          <a class="el-icon-arrow-up" />
        </span>
      </div>
    </div>
    <slot />
    <transition name="el-fade-in-linear">
      <div v-if="!isPanelFold" class="details_table_box">
        <div
          v-if="tableData.thList && tableData.trList"
          class="details_table_th details_table_tit flex"
        >
          <div
            v-for="(tit_item,tit_index) in tableData.thList"
            :key="tit_index"
            class="max_w details_table_item"
            style="background:#e5e5e5;"
          >{{ tit_item }}</div>
        </div>
        <div
          v-for="(tr_item,tr_index) in tableData.trList"
          :key="tr_index"
          class="details_table_th flex"
        >
          <div
            v-for="(td_item,td_index) in tr_item"
            :key="td_index"
            class="max_w details_table_item"
          >{{ td_item }}</div>
        </div>

        <div
          v-if="tableData.thObjList && tableData.trObjList"
          class="details_table_th details_table_tit flex"
        >
          <div
            v-for="(tit_item,tit_index) in tableData.thObjList"
            :key="tit_index"
            class="max_w details_table_item"
            style="background:#e5e5e5;"
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
                <el-button :key="j" style="margin-right:5px" type="text" @click="onClickContentBtn(i)">{{ i.name }}</el-button>
                <div v-if="j!=(td_item.list.length-1)" :key="j" style="margin-right:5px;margin-top:-2px;" class="table-inline-divider" />
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
    onclick(item) {
      this.$emit(item.action)
    },
    click_cb(item, index) {
      this.$emit('table_click', {
        index: index,
        item: item
      })
    },
    onClickContentBtn (item) {
      this.$emit(item.action)
    },
    editor() {
      this.$emit('onclick')
    }
  }
}
</script>
<style scoped>
.content-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
