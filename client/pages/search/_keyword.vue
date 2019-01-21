<template>
  <section style="display:flex">
    <div style="flex:1">
      <el-row>
        <i>icon</i>搜索结果 <span>：</span><span>{{ $route.params.tag }}</span>
      </el-row>
      <el-row>
        <nuxt-link
          v-for="item in articles"
          :key="item._id"
          :to="{path: `/articles/${item._id}`}"
        >
          <el-card
            shadow="hover"
            style="height:200px"
          >
            <el-col :span="10">
              <span>分类1</span>
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div>
                <el-tag :type="item.isOriginal ? 'success' : 'info'">{{ item.isOriginal ? '原创' : '转载' }}</el-tag>
                <span><i class="el-icon-date" /> &nbsp; {{ item.createTime.year === new Date().getFullYear() ? item.createTime.simpleDate : item.createTime.fullDate }}</span>
              </div>
              <template>
                <!-- 为 “私有(isPublic: false)” 文章，显示“私有”字样 -->
                <el-tag
                  v-if="!item.isPublic"
                  type="warning"
                >
                  {{ '私有' }}
                </el-tag>
                <!-- 为 “草稿(isPublished: false)” 文章，显示“草稿”字样 -->
                <el-tag
                  v-if="!item.isPublished"
                  type="warning"
                >
                  {{ '草稿' }}
                </el-tag>
              </template>
            </el-col>
            <el-col :span="10">
              <!-- <img
                src="~/assets/1540478160349.png"
                alt="Cover image"
                style="display:block;height:200px"
              > -->
            </el-col>
          </el-card>
        </nuxt-link>
      </el-row>
    </div>
    <side-section
      id="sideSection"
      style="flex:1; margin-top:20px"
    />
  </section>
</template>

<script>
import SideSection from '~/components/public/SideSection'

export default {
  components: {
    SideSection
  },

  async asyncData ({ app, route }) {
    try {
      let {data} = await app.$axios.get(
        '/api/search',
        {params: {keyword: route.params.keyword}}
      )
      let {articles} = data
      return {articles}
    } catch (err) {
      this.$message.error(err)
    }
  }

}
</script>
