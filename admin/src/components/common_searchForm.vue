<template>
  <div>
    <div v-for="(row, key) in config.list" :key="key" class="search-form">
      <template v-if="key==0">
        <template v-for="(item, index) in row">

          <!-- 操作按钮 -->
          <div v-if="item.type=='btns'" :key="index" class="search-form-item">
            <span class="search-form-item-label" />
            <el-button
              type="primary"
              style="width:75px;font-size:14px;margin-right:5px;"
              size="small"
              icon="el-icon-search"
              :loading="config.seaching"
              @click="search_table"
            >{{ config.seaching ? '' : '搜索' }}</el-button>
            <el-button
              v-if="config.list.length>1"
              style="font-size:14px;width:35px;margin-left:0;"
              type="text"
              @click="more_search"
            >{{ config.showMore?'收起':'更多' }}</el-button>
            <el-button
              style="font-size:14px;width:35px;margin-left:0;"
              type="text"
              @click="clear_search"
            >清空</el-button>
          </div>

          <!-- select -->
          <div v-if="item.type=='select'" :key="index" class="search-form-item">
            <span class=" search-form-item-label">{{ item.title }}</span>
            <el-select
              v-model="item.value"
              class="search-form-item-input"
              size="mini"
              :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
            >
              <el-option
                v-for="elem in item.options"
                :key="elem.value"
                :label="elem.label"
                :value="elem.value"
              />
            </el-select>
          </div>

          <!-- input -->
          <div v-if="item.type=='input'" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-input
              v-model="item.value"
              class="search-form-item-input"
              size="mini"
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.title"
            />
          </div>

          <!-- dateTo -->
          <div v-if="item.type=='dateTo'" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-date-picker
              v-model="item.value"
              size="mini"
              class="search-form-item-input el-double-date-picker"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <!-- checkbox -->
          <div v-if="item.type=='checkbox' || (index>3&&config.showMore)" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-checkbox
              v-for="(opt, optIdx) in item.options"
              :key="optIdx"
              v-model="opt.value"
              :border="item.border"
              :label="opt.label"
            />
          </div>

        </template>
      </template>

      <template v-if="key>0 && config.showMore">
        <template v-for="(item, index) in row">

          <!-- select -->
          <div v-if="item.type=='select'" :key="index" class="search-form-item">
            <span class=" search-form-item-label">{{ item.title }}</span>
            <el-select
              v-model="item.value"
              class="search-form-item-input"
              size="mini"
              :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
            >
              <el-option
                v-for="elem in item.options"
                :key="elem.value"
                :label="elem.label"
                :value="elem.value"
              />
            </el-select>
          </div>

          <!-- input -->
          <div v-if="item.type=='input'" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-input
              v-model="item.value"
              class="search-form-item-input"
              size="mini"
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.title"
            />
          </div>

          <!-- dateTo -->
          <div v-if="item.type=='dateTo' || (index>3&&config.showMore)" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-date-picker
              v-model="item.value"
              size="mini"
              class="search-form-item-input el-double-date-picker"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <!-- checkbox -->
          <div v-if="item.type=='checkbox' || (index>3&&config.showMore)" :key="index" class="search-form-item">
            <span class="search-form-item-label">{{ item.title }}</span>
            <el-checkbox
              v-for="(opt, optIdx) in item.options"
              :key="optIdx"
              v-model="opt.value"
              :border="item.border"
              :label="opt.label"
            />
          </div>

        </template>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: '',
  components: { },
  props: ['config'],
  data () {
    return {
      // 示例数据
      // searchConfig: {
      //   showMore: false,
      //   seaching: false, // 是否正在搜索中
      //   list: [
      //     [
      //       {type: 'checkbox', title:'事业部', border: true,
      //         options: [{label:'报警', value:''}, {label:'故障', value:''}]
      //       },
      //       { type: 'dateTo', title: '创建时间', value: '' },
      //       { type: 'input', title: '项目', value: '' },
      //       { type: 'btns' },
      //     ],
      //     [
      //       { type: 'select', title:'区域', value: '', options: []},
      //       { type: 'select', title:'位置', value: '' },
      //     ]
      //   ]
      // }
    }
  },
  computed: {},
  created () {},
  methods: {
    more_search() {
      this.config.showMore = !this.config.showMore
      // if (this.show_more_search) {
      //   this.tableConfig.height = document.documentElement.clientHeight - 168;
      // } else {
      //   this.tableConfig.height = document.documentElement.clientHeight - 130;
      // }
    },
    search_table() {
      this.searchConfig.seaching = true
      this.get_table_info(
        this.tableConfig.pageIndex,
        this.tableConfig.pageSize,
        this.searchConfig.data.dep
      )
    },
    clear_search() {
      this.config.list.forEach(row => {
        row.forEach((item, index, arr) => {
          arr[index].value = ''
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.search-form {
  display: flex;
  flex-wrap: wrap;
}
.search-form-item {
  height: 38px;
  line-height: 38px;
  width: calc(100%/4) !important;
  .search-form-item-label {
    text-align: right;
    display: inline-block;
    width: 80px;
    margin-right:5px;
    font-size:14px;
  }
  .search-form-item-input {
    width: 70% !important;
  }
}
.search-form-controls {
  display: flex;
  align-items: center;
}
.search-form-btn {
  width: 220px !important;
}
</style>
